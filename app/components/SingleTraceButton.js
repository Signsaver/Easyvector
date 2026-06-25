'use client';

import { useState } from 'react';

export function SingleTraceButton({ className, style }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_1 }),
      });

      // Not signed in — send them to register, then they can buy a trace.
      if (res.status === 401) {
        window.location.href = '/sign-up';
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout failed:', data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(false);
    }
  };

  return (
    <button className={className} style={style} onClick={handleClick} disabled={loading}>
      {loading ? 'Loading…' : 'Buy a Single Trace'}
    </button>
  );
}
