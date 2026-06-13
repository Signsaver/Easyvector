import Link from 'next/link';
import Image from 'next/image';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={220} height={42} priority /></Link>

        <div className={styles.code}>404</div>
        <h1 className={styles.title}>That page got lost in translation</h1>
        <p className={styles.text}>
          The page you&apos;re looking for doesn&apos;t exist, may have been moved, or the URL might be off.
          No nodes, no paths — just a dead end. Let&apos;s get you back on track.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>Back to Homepage</Link>
          <Link href="/support" className={styles.btnGhost}>Contact Support</Link>
        </div>

        <div className={styles.links}>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/sign-up">Try Free</Link>
        </div>
      </div>
    </main>
  );
}
