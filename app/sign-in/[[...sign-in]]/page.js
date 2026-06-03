import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={260} height={50} priority /></Link>
      <SignIn
        appearance={{ elements: { rootBox: styles.clerkBox } }}
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
