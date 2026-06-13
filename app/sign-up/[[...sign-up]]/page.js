'use client';

import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function SignUpPage() {
  const [hasPendingCheckout, setHasPendingCheckout] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasPendingCheckout(!!sessionStorage.getItem('pendingCheckoutPriceId'));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={260} height={50} priority /></Link>
      {!hasPendingCheckout && (
        <div className={styles.offer}>
          <span className={styles.offerBadge}>🎁 Free Trial</span>
          <p>Register now and get <strong>1 free vector trace</strong> — no credit card required</p>
        </div>
      )}
      <SignUp
        appearance={{ elements: { rootBox: styles.clerkBox } }}
        redirectUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </div>
  );
}
