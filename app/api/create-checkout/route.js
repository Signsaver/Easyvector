import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_CREDITS = {
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_1]: { credits: 1, type: 'payg' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_5]: { credits: 5, type: 'payg' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_HOBBY]: { credits: 50, type: 'subscription', plan: 'hobby' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO]: { credits: 150, type: 'subscription', plan: 'pro' },
  [process.env.NEXT_PUBLIC_STRIPE_PRICE_STUDIO]: { credits: 350, type: 'subscription', plan: 'studio' },
  'price_1TfPi6L0DPwWCCgGIJNkzKMW': { credits: 1, type: 'subscription', plan: 'test' },
};

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorised' }, { status: 401 });
    }
    const { priceId } = await request.json();
    if (!priceId) {
      return Response.json({ error: 'Price ID required' }, { status: 400 });
    }
    const priceInfo = PRICE_CREDITS[priceId];
    if (!priceInfo) {
      return Response.json({ error: 'Invalid price ID' }, { status: 400 });
    }
    const isSubscription = priceInfo.type === 'subscription';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: isSubscription ? 'subscription' : 'payment',
success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://easyvector.ai'}/success?session_id={CHECKOUT_SESSION_ID}`,      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://easyvector.ai'}/#pricing`,
      automatic_tax: { enabled: true },
      metadata: {
        userId,
        priceId,
        credits: priceInfo.credits.toString(),
        plan: priceInfo.plan || 'payg',
      },
    });
    return Response.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
