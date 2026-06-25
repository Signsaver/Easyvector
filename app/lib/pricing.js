// app/lib/pricing.js
// Detects US visitors via IP geolocation and returns correct currency/prices.
// Uses ipapi.co (free, no API key needed for low traffic).
// Call once on page load and cache in sessionStorage.
export const PRICES = {
  GBP: {
    symbol: '£',
    trace: '2',
    hobby: '11.99',
    studio: '19.99',
  },
  USD: {
    symbol: '$',
    trace: '3',
    hobby: '14.99',
    studio: '24.99',
  },
};

export async function getCurrency() {
  if (typeof window === 'undefined') return 'GBP';
  // Check sessionStorage cache first to avoid repeat API calls
  const cached = sessionStorage.getItem('ev_currency');
  if (cached) return cached;
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    const currency = data.country_code === 'US' ? 'USD' : 'GBP';
    sessionStorage.setItem('ev_currency', currency);
    return currency;
  } catch {
    // Default to GBP if geolocation fails
    return 'GBP';
  }
}
