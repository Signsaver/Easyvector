import Stripe from 'stripe';
import { addCredits, updateStripeCustomer } from '../../../lib/supabase';
import { sendWelcomeEmail } from '../../../lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Used ONLY to look up the plan name for the welcome email.
// Credits are NOT granted from this map — they come from the checkout session
// metadata (set in create-checkout/route.js), which is the single source of truth.
const PRICE_PLANS = {
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_1]: { plan: 'payg' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_5]: { plan: 'payg' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_HOBBY]: { plan: 'hobby' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_STUDIO]: { plan: 'studio' },
};

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return Response.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        // SINGLE source of credit grants — fires for both one-off and subscription
        // checkouts. Credits and plan come from the metadata set in create-checkout.
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const creditsToAdd = parseInt(session.metadata?.credits || '0');
        const plan = session.metadata?.plan || 'payg';
        if (!userId || creditsToAdd === 0) break;
        await addCredits(userId, creditsToAdd, plan);
        if (session.customer) {
          await updateStripeCustomer(
            userId,
            session.customer,
            session.subscription || null
          );
        }
        console.log(`Added ${creditsToAdd} credits to user ${userId}`);
        break;
      }

      case 'customer.subscription.created': {
        // Welcome email ONLY. Credits are already granted by
        // checkout.session.completed above — do NOT add them here, or every
        // subscriber is double-credited.
        const subscription = event.data.object;
        const priceId = subscription.items?.data[0]?.price?.id;
        const priceInfo = PRICE_PLANS[priceId];
        if (!priceInfo) break;
        try {
          const customer = await stripe.customers.retrieve(subscription.customer);
          if (customer?.email && !customer.deleted) {
            await sendWelcomeEmail({
              email: customer.email,
              plan: priceInfo.plan,
            });
          }
        } catch (emailErr) {
          // Don't fail the webhook if email sending fails
          console.error('Welcome email failed:', emailErr.message);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const { supabaseAdmin } = await import('../../../lib/supabase');
        await supabaseAdmin
          .from('user_credits')
          .update({ plan: 'free', stripe_subscription_id: null })
          .eq('stripe_customer_id', subscription.customer);
        console.log(`Subscription cancelled for customer ${subscription.customer}`);
        break;
      }
    }
    return Response.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
