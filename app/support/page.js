import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

export const metadata = {
  title: 'Support — EasyVector.ai',
  description: 'Get help with EasyVector.ai. FAQs, contact details and support resources.',
};

export default function SupportPage() {
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
        <h1 style={{fontFamily:'var(--font-display)', fontSize:'3rem', letterSpacing:'0.05em', marginBottom:'0.5rem'}}>SUPPORT</h1>
        <p style={{color:'var(--muted)', marginBottom:'3rem', fontSize:'0.9rem'}}>We&apos;re here to help. Check the FAQs below or get in touch directly.</p>

        {/* CONTACT CARD */}
        <div style={{background:'var(--surface2)', border:'1px solid var(--border2)', borderRadius:'12px', padding:'2rem', marginBottom:'3rem', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1.5rem', flexWrap:'wrap'}}>
          <div>
            <div style={{fontFamily:'var(--font-display)', fontSize:'1.4rem', letterSpacing:'0.05em', marginBottom:'0.4rem'}}>GET IN TOUCH</div>
            <p style={{color:'var(--muted)', fontSize:'0.9rem'}}>Email us and we&apos;ll get back to you within 1 business day.</p>
          </div>
          <a href="mailto:hello@easyvector.ai" style={{background:'var(--accent)', color:'#000', padding:'0.65rem 1.75rem', borderRadius:'6px', fontWeight:'600', fontSize:'0.9rem', whiteSpace:'nowrap', textDecoration:'none'}}>
            hello@easyvector.ai
          </a>
        </div>

        {/* FAQS */}
        <h2 style={{fontFamily:'var(--font-display)', fontSize:'2rem', letterSpacing:'0.05em', marginBottom:'2rem'}}>FREQUENTLY ASKED QUESTIONS</h2>

        <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
          {[
            {
              q: 'What file formats can I upload?',
              a: 'You can upload PNG, JPG, JPEG, GIF, WebP and BMP files. Files are automatically resized if they exceed the processing limit.'
            },
            {
              q: 'What vector formats can I download?',
              a: 'EasyVector.ai outputs SVG, EPS, DXF, PDF and AI formats. SVG is ideal for web and design, EPS for print and vinyl, DXF for CNC routers and laser cutters, and PDF for universal print use.'
            },
            {
              q: 'What is a "trace" or "credit"?',
              a: 'Each vectorization counts as one trace (one credit). Your plan includes a set number of traces per month. Pay-as-you-go credits never expire.'
            },
            {
              q: 'What is Test mode vs Production mode?',
              a: 'Test mode is free and produces a watermarked preview — great for checking the result before spending a credit. Production mode uses one credit and delivers a clean, full-quality vector ready for professional use.'
            },
            {
              q: 'My image is too large — what should I do?',
              a: 'EasyVector.ai automatically resizes images that exceed the processing limit before tracing, so you can upload large files without worrying. The quality is preserved as much as possible during resizing.'
            },
            {
              q: 'Can I use EasyVector.ai for AI-generated images?',
              a: 'Absolutely — that\'s one of the main reasons we built it. AI-generated images are often delivered as PNGs with no vector paths, making them impossible to cut, route or print at scale without redrawing. EasyVector converts them to production-ready vectors instantly.'
            },
            {
              q: 'How do I cancel my subscription?',
              a: 'You can cancel at any time from your account settings. Your subscription remains active until the end of the current billing period and you will not be charged again.'
            },
            {
              q: 'Do unused credits roll over?',
              a: 'Monthly subscription credits do not roll over at the end of each billing period. Pay-as-you-go credits never expire.'
            },
            {
              q: 'Is my data secure?',
              a: 'Yes. Images you upload are processed and immediately discarded — we do not store your files. Account data is stored securely and we use industry-standard encryption throughout. See our Privacy Policy for full details.'
            },
            {
              q: 'I have a question not answered here — what should I do?',
              a: 'Email us at hello@easyvector.ai and we\'ll be happy to help.'
            },
          ].map((faq, i) => (
            <div key={i} style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'8px', padding:'1.5rem'}}>
              <div style={{fontWeight:'600', marginBottom:'0.6rem', color:'var(--text)'}}>{faq.q}</div>
              <p style={{color:'var(--muted)', fontSize:'0.9rem', lineHeight:'1.7'}}>{faq.a}</p>
            </div>
          ))}
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
