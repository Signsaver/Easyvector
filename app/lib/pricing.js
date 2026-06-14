// app/lib/pricing.js
// Detects US visitors via IP geolocation and returns correct currency/prices.
// Uses ipapi.co (free, no API key needed for low traffic).
// Call once on page load and cache in sessionStorage.

export const PRICES = {
  GBP: {
    symbol: '£',
    hobby: '19',
    pro: '39',
    studio: '79',
    agency: '149',
  },
  USD: {
    symbol: '$',
    hobby: '25',
    pro: '49',
    studio: '99',
    agency: '189',
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
