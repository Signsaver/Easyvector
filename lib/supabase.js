import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Get user credits from database
export async function getUserCredits(userId) {
  const { data, error } = await supabaseAdmin
    .from('user_credits')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // User not found — create with 1 free credit
    const { data: newUser } = await supabaseAdmin
      .from('user_credits')
      .insert({ user_id: userId, credits: 1, plan: 'free' })
      .select()
      .single();
    return newUser;
  }

  return data;
}

// Add credits to user account
export async function addCredits(userId, creditsToAdd, plan = null) {
  const existing = await getUserCredits(userId);

  const updates = {
    credits: (existing?.credits || 0) + creditsToAdd,
    updated_at: new Date().toISOString(),
  };

  if (plan) updates.plan = plan;

  const { data, error } = await supabaseAdmin
    .from('user_credits')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Deduct 1 credit from user
export async function deductCredit(userId) {
  const existing = await getUserCredits(userId);

  if (!existing || existing.credits <= 0) {
    throw new Error('No credits remaining');
  }

  const { data, error } = await supabaseAdmin
    .from('user_credits')
    .update({
      credits: existing.credits - 1,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update stripe customer info
export async function updateStripeCustomer(userId, stripeCustomerId, subscriptionId = null) {
  const updates = {
    stripe_customer_id: stripeCustomerId,
    updated_at: new Date().toISOString(),
  };
  if (subscriptionId) updates.stripe_subscription_id = subscriptionId;

  await supabaseAdmin
    .from('user_credits')
    .update(updates)
    .eq('user_id', userId);
}
