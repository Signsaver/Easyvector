import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

export const metadata = {
  title: 'Terms of Service — EasyVector.ai',
  description: 'Terms of Service for EasyVector.ai, operated by Signsaver Ltd.',
};

export default function TermsPage() {
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
        <h1 style={{fontFamily:'var(--font-display)', fontSize:'3rem', letterSpacing:'0.05em', marginBottom:'0.5rem'}}>TERMS OF SERVICE</h1>
        <p style={{color:'var(--muted)', marginBottom:'3rem', fontSize:'0.9rem'}}>Last updated: June 2026</p>

        <div style={{lineHeight:'1.8', color:'var(--text)', fontSize:'0.95rem'}}>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>1. ABOUT EASYVECTOR.AI</h2>
            <p>EasyVector.ai is an online image vectorization service operated by <strong>Signsaver Ltd</strong>, registered in England and Wales, with its registered office at 20-22 Wenlock Road, London, England, N1 7GU.</p>
            <p style={{marginTop:'0.75rem'}}>By registering for or using EasyVector.ai, you agree to these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>2. THE SERVICE</h2>
            <p>EasyVector.ai allows users to upload bitmap images (PNG, JPG, GIF, WebP, BMP) and convert them to vector formats (SVG, EPS, DXF, PDF, AI). The service is provided on a credit-based system, with credits allocated based on your subscription plan or pay-as-you-go purchase.</p>
            <p style={{marginTop:'0.75rem'}}>We reserve the right to modify, suspend, or discontinue any part of the service at any time, with reasonable notice where possible.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>3. ACCOUNTS</h2>
            <p>You must register for an account to use EasyVector.ai. You are responsible for:</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activity that occurs under your account</li>
              <li>Ensuring your account information is accurate and up to date</li>
            </ul>
            <p style={{marginTop:'0.75rem'}}>You must be at least 18 years old to register. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>4. ACCEPTABLE USE</h2>
            <p>You agree not to use EasyVector.ai to:</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li>Upload images that infringe third-party intellectual property rights</li>
              <li>Upload illegal, harmful, or offensive content</li>
              <li>Attempt to reverse engineer, scrape, or abuse the service</li>
              <li>Resell or redistribute the service without our written permission</li>
              <li>Use automated scripts to exceed your plan's usage limits</li>
            </ul>
            <p style={{marginTop:'0.75rem'}}>We reserve the right to terminate your account if you breach these terms.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>5. INTELLECTUAL PROPERTY</h2>
            <p>You retain full ownership of any images you upload and any vectors you download. We do not claim any rights over your content.</p>
            <p style={{marginTop:'0.75rem'}}>The EasyVector.ai platform, logo, and all associated software are owned by Signsaver Ltd and protected by intellectual property law. You may not copy, reproduce, or distribute any part of the platform without our written consent.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>6. PAYMENTS AND SUBSCRIPTIONS</h2>
            <p>All prices are shown exclusive of VAT. VAT is added at checkout where applicable.</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li><strong>Subscriptions</strong> are billed monthly and renew automatically until cancelled.</li>
              <li><strong>Credits</strong> allocated under a subscription plan expire at the end of each billing period and do not roll over unless stated otherwise.</li>
              <li><strong>Pay-as-you-go credits</strong> do not expire.</li>
              <li><strong>Cancellations</strong> take effect at the end of the current billing period. No partial refunds are issued for unused credits within a billing period.</li>
              <li><strong>Refunds</strong> are considered on a case-by-case basis. Contact us at hello@easyvector.ai within 14 days of purchase.</li>
            </ul>
            <p style={{marginTop:'0.75rem'}}>Payments are processed securely by Stripe. We do not store your card details.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>7. FREE TRIAL</h2>
            <p>New users receive 1 free trace on registration. No credit card is required for the free trace. Paid plans include a 14-day free trial. You may cancel before the trial ends without being charged.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>8. LIMITATION OF LIABILITY</h2>
            <p>To the maximum extent permitted by law, Signsaver Ltd shall not be liable for:</p>
            <ul style={{marginTop:'0.75rem', paddingLeft:'1.5rem', lineHeight:'2'}}>
              <li>Any indirect, incidental, or consequential loss arising from use of the service</li>
              <li>Loss of data, revenue, or business opportunity</li>
              <li>Service interruptions or technical failures beyond our reasonable control</li>
            </ul>
            <p style={{marginTop:'0.75rem'}}>Our total liability to you shall not exceed the amount you paid to us in the 3 months preceding the claim.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>9. DISCLAIMER OF WARRANTIES</h2>
            <p>EasyVector.ai is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the service will be uninterrupted, error-free, or that vectorization results will meet your specific requirements. Output quality depends on the nature and complexity of the input image.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>10. GOVERNING LAW</h2>
            <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>11. CHANGES TO THESE TERMS</h2>
            <p>We may update these Terms from time to time. We will notify you of material changes by email or by posting a notice on the website. Continued use of EasyVector.ai after changes constitutes acceptance of the updated Terms.</p>
          </section>

          <section style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontFamily:'var(--font-display)', fontSize:'1.6rem', letterSpacing:'0.05em', marginBottom:'1rem', color:'var(--accent)'}}>12. CONTACT</h2>
            <p>For any queries regarding these Terms, please contact:</p>
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
