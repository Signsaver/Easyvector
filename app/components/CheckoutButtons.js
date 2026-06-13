'use client';

async function handleCheckout(priceId) {
  const res = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });

  if (res.status === 401) {
    // Not signed in — remember the chosen plan and send them to sign up.
    // After sign-up/sign-in they'll land on /dashboard, which will pick
    // this up and resume checkout automatically.
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
  return <button onClick={() => handleCheckout('price_1Te924L0DPwWCCgGKMTFTYRP')} className={className} style={style}>Start Free Trial</button>;
}
export function ProButton({ className, style }) {
  return <button onClick={() => handleCheckout('price_1Te92mL0DPwWCCgGhp8DW77U')} className={className} style={style}>Start Free Trial</button>;
}
export function StudioButton({ className, style }) {
  return <button onClick={() => handleCheckout('price_1Te955L0DPwWCCgGmFxM4C4H')} className={className} style={style}>Start Free Trial</button>;
}
export function TestButton() {
  return <button onClick={() => handleCheckout('price_1TfPi6L0DPwWCCgGIJNkzKMW')} style={{background:'#f5820a', color:'#000', border:'none', borderRadius:'6px', padding:'0.5rem 1.2rem', fontWeight:'600', cursor:'pointer'}}>Test Payment — £1.00</button>;
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
