'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-861109733/MkheCPbY-rocEOX7zZoD',
        currency: 'GBP',
        transaction_id: new URLSearchParams(window.location.search).get('session_id') ?? '',
      })
    }

    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      gap: '16px'
    }}>
      <h1 style={{ fontSize: '2rem' }}>🎉 Payment successful!</h1>
      <p style={{ color: '#666' }}>Your credits are being added to your account.</p>
      <p style={{ color: '#999', fontSize: '0.9rem' }}>Redirecting you to your dashboard...</p>
    </div>
  )
}
