import Image from 'next/image';
import styles from './Logo.module.css';

export default function Logo({ size = 'nav' }) {
  const sizes = {
    nav:  { icon: 32, font: '1.8rem' },
    hero: { icon: 64, font: '3.5rem' },
    auth: { icon: 40, font: '2.2rem' },
  };

  const s = sizes[size] || sizes.nav;

  return (
    <div className={styles.logo} style={{ '--font-size': s.font }}>
      <Image
        src="/finger-snap.svg"
        alt="EasyVector snap icon"
        width={s.icon}
        height={s.icon}
        className={styles.icon}
      />
      <span className={styles.wordmark}>
        Easy<span className={styles.accent}>Vector</span><span className={styles.dot}>.ai</span>
      </span>
    </div>
  );
}
