import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

export const metadata = {
  title: 'Privacy Policy — EasyVector.ai',
  description: 'Privacy Policy for EasyVector.ai, operated by Signsaver Ltd.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={280} height={52} priority /></Link>
        <div className={styles.navActions}>
          <Link href="/sign-in" className={styles.navSignIn}>Sign In</Link>
          <Link href="/sign-up" className={styles.navCta}>Try Free — Register</Link>
        </div>
      </nav>

      <div className={styles.wrap} style={{paddingTop:'4rem', paddingBottom:'6rem', maxWidth:'800px'}}>
        <h1 style={{fontFamily:'var(--font-display)', fontSize:'3rem', letterSpacing:'0.05em', marginBottom:'0.5rem'}}>PRIVACY POLICY</h1>
        <p style={{color:'var(--muted)', marginBottom:'3rem', fontSize:'0.9rem'}}>Last updated: June 2026</p>

        <div style={{lineHeight:'1.8', color:'var(--text)', fontSize:'0.95rem'}}>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>1. WHO WE ARE</h2>
            <p>EasyVector.ai is operated by <strong>Signsaver Ltd</strong>, a company registered in England and Wales.</p>
            <p style={{marginTop:'0.75rem'}}><strong>Registered address:</strong> 20-22 Wenlock Road, London, England, N1 7GU</p>
            <p style={{marginTop:'0.75rem'}}><strong>Email:</strong> support@easyvector.ai</p>
            <p style={{marginTop:'0.75rem'}}><strong>ICO Registration Number:</strong> ZC168026</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>2. WHAT DATA WE COLLECT</h2>
            <p>We collect the following personal data when you use EasyVector.ai:</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li><strong>Account information</strong> — your name and email address, collected when you register via Clerk.</li>
              <li><strong>Payment information</strong> — billing details processed securely by Stripe. We do not store your card details.</li>
              <li><strong>Usage data</strong> — number of traces used, subscription plan, and credit balance, stored in our database.</li>
              <li><strong>Uploaded images</strong> — images you upload for vectorization are processed and immediately discarded. We do not store your uploaded files.</li>
              <li><strong>Technical data</strong> — IP address, browser type, and device information collected automatically when you use the service.</li>
            </ul>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>3. HOW WE USE YOUR DATA</h2>
            <p>We use your data to:</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li>Provide and operate the EasyVector.ai service</li>
              <li>Process payments and manage your subscription</li>
              <li>Track your credit usage and plan entitlements</li>
              <li>Send transactional emails (account confirmation, payment receipts)</li>
              <li>Respond to support requests</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>4. LEGAL BASIS FOR PROCESSING</h2>
            <p>Under UK GDPR, we process your data on the following legal bases:</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li><strong>Contract</strong> — processing necessary to provide the service you have signed up for.</li>
              <li><strong>Legitimate interests</strong> — to improve our service and prevent fraud.</li>
              <li><strong>Legal obligation</strong> — where required by law.</li>
            </ul>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>5. THIRD PARTY SERVICES</h2>
            <p>We use third-party service providers to operate EasyVector.ai, including for authentication, payments, hosting, email, geolocation, and infrastructure services. These providers process data only as necessary to deliver our service and are bound by their own privacy policies: <a href="https://clerk.com/privacy" style={{color:'var(--accent)'}}>Clerk</a> · <a href="https://stripe.com/privacy" style={{color:'var(--accent)'}}>Stripe</a> · <a href="https://supabase.com/privacy" style={{color:'var(--accent)'}}>Supabase</a> · <a href="https://vercel.com/legal/privacy-policy" style={{color:'var(--accent)'}}>Vercel</a> · <a href="https://resend.com/privacy" style={{color:'var(--accent)'}}>Resend</a> · <a href="https://ipapi.co/privacy" style={{color:'var(--accent)'}}>ipapi.co</a> · <a href="https://vectorizer.ai/privacy" style={{color:'var(--accent)'}}>Vectorizer.ai</a></p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>6. DATA RETENTION</h2>
            <p>We retain your account data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal or financial compliance purposes (e.g. payment records, which are retained for 7 years under UK law).</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>7. YOUR RIGHTS</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Lodge a complaint with the ICO at <a href="https://ico.org.uk" style={{color:'var(--accent)'}}>ico.org.uk</a></li>
            </ul>
            <p style={{marginTop:'0.75rem'}}>To exercise any of these rights, email us at <a href="mailto:support@easyvector.ai" style={{color:'var(--accent)'}}>support@easyvector.ai</a>.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>8. COOKIES</h2>
            <p>EasyVector.ai uses essential cookies only — these are required for authentication and session management. We do not use advertising or tracking cookies.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>9. CHANGES TO THIS POLICY</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on the website. Continued use of EasyVector.ai after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>10. CONTACT</h2>
            <p>For any privacy-related queries, please contact:</p>
            <p style={{marginTop:'0.75rem'}}><strong>Signsaver Ltd</strong><br/>20-22 Wenlock Road, London, England, N1 7GU<br/><a href="mailto:support@easyvector.ai" style={{color:'var(--accent)'}}>support@easyvector.ai</a></p>
          </section>

        </div>
      </div>

      <footer className={styles.footer}>
        <Image src="/logo.svg" alt="EasyVector.ai" width={220} height={42} />
        <ul className={styles.footerLinks}>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
          <li><Link href="/how-it-works">How It Works</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
      </footer>
    </div>
  );
}
