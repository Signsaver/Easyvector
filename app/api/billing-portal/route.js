// app/api/billing-portal/route.js
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { getUserCredits } from '../../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: 'Unauthorised' }, { status: 401 });
    }

    // Look up the Stripe customer ID we saved at checkout.
    const record = await getUserCredits(userId);
    const customerId = record?.stripe_customer_id;

    if (!customerId) {
      // No purchase yet — nothing to bill, so no portal to show.
      return Response.json(
        { error: 'No billing history yet. Make a purchase first.' },
        { status: 400 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://easyvector.ai'}/dashboard`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error('Billing portal error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
