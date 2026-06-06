'use client';

export default function CheckoutButtons() {
  async function handleCheckout(priceId) {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <button onClick={() => handleCheckout('price_1Te924L0DPwWCCgGKMTFTYRP')} data-plan="hobby">Start Free Trial</button>
      <button onClick={() => handleCheckout('price_1Te92mL0DPwWCCgGhp8DW77U')} data-plan="pro">Start Free Trial</button>
      <button onClick={() => handleCheckout('price_1Te955L0DPwWCCgGmFxM4C4H')} data-plan="studio">Start Free Trial</button>
      <button onClick={() => handleCheckout('price_1TfPi6L0DPwWCCgGIJNkzKMW')} data-plan="test">Test Payment — £1.00</button>
    </>
  );
}
