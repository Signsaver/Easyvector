'use client';

// Price IDs now come from Vercel env vars — the SAME ones create-checkout/route.js
// uses to map credits. This makes Vercel the single source of truth: change a price
// in Stripe, update the env var, redeploy, and both the button and the credit grant
// move together. (Previously these were hardcoded and silently bypassed the env vars.)
const PRICE_HOBBY = process.env.NEXT_PUBLIC_STRIPE_PRICE_HOBBY;
const PRICE_STUDIO = process.env.NEXT_PUBLIC_STRIPE_PRICE_STUDIO;
const PRICE_PRO = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO; // retired tier — kept only so any stray import doesn't break the build

export async function handleCheckout(priceId) {
  if (!priceId) {
    alert('This plan isn’t configured yet. Please try again shortly.');
    return;
  }
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });
  if (res.status === 401) {
    // Not signed in — remember the chosen plan and send them to sign up.
    // After sign-up/sign-in they land on /dashboard, which calls
    // resumeCheckoutIfPending() to pick this up and resume checkout.
    sessionStorage.setItem('pendingCheckoutPriceId', priceId);
    window.location.href = '/sign-up?redirect_url=/dashboard';
    return;
  }
  const data = await res.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    alert('Something went wrong. Please try again.');
  }
}

export function HobbyButton({ className, style }) {
  return <button onClick={() => handleCheckout(PRICE_HOBBY)} className={className} style={style}>Subscribe</button>;
}

export function StudioButton({ className, style }) {
  return <button onClick={() => handleCheckout(PRICE_STUDIO)} className={className} style={style}>Subscribe</button>;
}

// Retired: Pro tier no longer shown on the site and not mapped in route.js.
// Left here only to avoid breaking any leftover import. Safe to delete once
// you've confirmed nothing else references it.
export function ProButton({ className, style }) {
  return <button onClick={() => handleCheckout(PRICE_PRO)} className={className} style={style}>Subscribe</button>;
}

// Deprecated: route.js no longer maps the test price, so this button will error
// if clicked. Left in place so any hidden /test page that imports it still builds.
// Safe to delete if unused.
export function TestButton() {
  return <button onClick={() => handleCheckout('price_1TfPi6L0DPwWCCgGIJNkzKMW')} style={{background:'#de4426', color:'#000', border:'none', borderRadius:'6px', padding:'0.5rem 1.2rem', fontWeight:'600', cursor:'pointer'}}>Test Payment — £1.00</button>;
}

// Exported so the dashboard page can resume checkout after sign-up/sign-in.
export async function resumeCheckoutIfPending() {
  const priceId = sessionStorage.getItem('pendingCheckoutPriceId');
  if (!priceId) return;
  sessionStorage.removeItem('pendingCheckoutPriceId');
  try {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error('Failed to resume checkout:', err);
  }
}
