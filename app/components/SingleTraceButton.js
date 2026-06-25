'use client';

import { handleCheckout } from './CheckoutButtons';

export function SingleTraceButton({ className, style }) {
  return (
    <button
      onClick={() => handleCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_PAYG_1)}
      className={className}
      style={style}
    >
      Buy a Single Trace
    </button>
  );
}
