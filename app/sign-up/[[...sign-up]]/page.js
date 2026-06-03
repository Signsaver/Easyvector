import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function SignUpPage() {
  return (
    <div className={styles.container}>
      <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={260} height={50} priority /></Link>
      <div className={styles.offer}>
        <span className={styles.offerBadge}>🎁 Free Trial</span>
        <p>Register now and get <strong>1 free vector trace</strong> — no credit card required</p>
      </div>
      <SignUp
        appearance={{ elements: { rootBox: styles.clerkBox } }}
        redirectUrl="/dashboard"
        signInUrl="/sign-in"
      />
    </div>
  );
}
