import Stripe from 'stripe';
import { addCredits, updateStripeCustomer } from '../../../lib/supabase';
import { sendWelcomeEmail } from '../../../lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const PRICE_CREDITS = {
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_1]: { credits: 1, plan: 'payg' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_5]: { credits: 5, plan: 'payg' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_HOBBY]: { credits: 50, plan: 'hobby' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO]: { credits: 150, plan: 'pro' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_STUDIO]: { credits: 350, plan: 'studio' },
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
        const subscription = event.data.object;
        const priceId = subscription.items?.data[0]?.price?.id;
        const priceInfo = PRICE_CREDITS[priceId];

        if (!priceInfo) break;

        const { supabaseAdmin } = await import('../../../lib/supabase');
        const { data: users } = await supabaseAdmin
          .from('user_credits')
          .select('user_id')
          .eq('stripe_customer_id', subscription.customer);

        if (users?.[0]?.user_id) {
          await addCredits(users[0].user_id, priceInfo.credits, priceInfo.plan);
        }

        // Send welcome email — look up customer email from Stripe
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
