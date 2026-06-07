import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import Demo from './components/Demo';
import { HobbyButton, ProButton, StudioButton } from './components/CheckoutButtons';
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className={styles.page}>

      {/* NAV */}
      <nav className={styles.nav}>
        <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={280} height={52} priority /></Link>
        <ul className={styles.navLinks}>
          <li><a href="#demo">See it in action</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#formats">Formats</a></li>
          <li><Link href="/how-it-works">How It Works</Link></li>
        </ul>
        <div className={styles.navSocials}>
          <a href="https://www.linkedin.com/in/easy-vector-946a4b414/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.facebook.com/easyvectorai/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/vectoreasily/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.youtube.com/@easyvectorai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/></svg>
          </a>
        </div>
        <div className={styles.navActions}>
          {userId ? (
            <Link href="/dashboard" className={styles.navCta}>Go to Dashboard</Link>
          ) : (
            <>
              <Link href="/sign-in" className={styles.navSignIn}>Sign In</Link>
              <Link href="/sign-up" className={styles.navCta}>Try Free — Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>Built for Sign Makers &amp; Print Professionals</div>
          <h1>Client sent you an <span>AI logo</span><br/>again?</h1>
          <p className={styles.heroSub}>AI-generated images look great — until your client sends one as a PNG and expects it cut, printed or routed by end of day. No nodes. No paths. Just pixels. EasyVector converts it to a clean, production-ready vector in seconds — no redrawing in Illustrator, no wasted hours.</p>
          <div className={styles.heroActions}>
            <Link href="/sign-up" className={styles.btnPrimary}>Try Free — Register Now</Link>
            <a href="#pricing" className={styles.btnGhost}>View Pricing</a>
          </div>
          <div className={styles.heroBadge}>
            <span>⚡</span>
            <span>Stop redrawing AI logos — convert to vector in seconds</span>
          </div>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardLabel}>Upload any bitmap</div>
            <div className={styles.heroCardArrow}>↓</div>
            <div className={styles.heroCardOutput}>
              <span className={styles.formatTag}>SVG</span>
              <span className={styles.formatTag}>DXF</span>
              <span className={styles.formatTag}>EPS</span>
              <span className={styles.formatTag}>PDF</span>
            </div>
            <div className={styles.heroCardLabel}>Download production-ready vectors</div>
            <Link href="/sign-up" className={styles.heroCardBtn}>Start Free →</Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}><div className={styles.statNum}>6</div><div className={styles.statLabel}>Output formats</div></div>
        <div className={styles.statItem}><div className={styles.statNum}>&lt;8s</div><div className={styles.statLabel}>Avg. processing time</div></div>
        <div className={styles.statItem}><div className={styles.statNum}>99.4%</div><div className={styles.statLabel}>Clean path accuracy</div></div>
        <div className={styles.statItem}><div className={styles.statNum}>24/7</div><div className={styles.statLabel}>Always available</div></div>
      </div>

      {/* DEMO */}
      <Demo />

      {/* FEATURES */}
      <section className={styles.section} id="features">
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Why professionals choose us</div>
          <div className={styles.sectionTitle}>TOOLS BUILT FOR THE TRADE</div>
          <div className={styles.featuresGrid}>
            {[
              { title: 'Kills the AI logo problem', text: 'Clients love AI-generated artwork — until it needs to be produced. EasyVector turns unprintable, unroutable PNGs into clean vectors your software can actually use.' },
              { title: 'Clean node output', text: 'Smooth Bezier curves and minimal anchor points — exactly what\'s required for easy cutting, weeding, high quality large format printing, CNC routing and laser cutting.' },
              { title: 'Colour separation', text: 'Automatically separate artwork into individual colour layers, ready for spot colour printing, multi-colour vinyl builds, and screen printing.' },
              { title: 'DXF for routing & plasma', text: 'Export DXF optimised for CNC routers, plasma cutters, and waterjet machines. Closed paths, correct winding order, no stray nodes.' },
              { title: 'Edge smoothing control', text: 'Adjust edge smoothing vs. detail retention. Perfect for promo gifts, embroidery and screen printing where clean paths are critical.' },
              { title: 'REST API for studios', text: 'Integrate EasyVector into your own ordering portal or customer-facing artwork upload flow. Full documentation and webhook support.' },
            ].map((f, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureTitle}>{f.title}</div>
                <p className={styles.featureText}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.section} id="how">
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>How it works</div>
          <div className={styles.sectionTitle}>FROM PHOTO TO PLOTTER IN SECONDS</div>
          <div className={styles.steps}>
            {[
              { n: '01', title: 'Register free', text: 'Create your account in seconds and get 1 free trace — no credit card needed.' },
              { n: '02', title: 'Upload your image', text: 'Drag and drop any PNG, JPG, GIF, WebP or BMP. We accept up to 30MB per file.' },
              { n: '03', title: 'Choose your format', text: 'Select SVG, DXF, EPS or PDF — each mode tuned for your specific output.' },
              { n: '04', title: 'Download & use', text: 'Open straight in your cutter software, Illustrator or CorelDRAW and go.' },
            ].map((s, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{s.n}</div>
                <div className={styles.stepTitle}>{s.title}</div>
                <p className={styles.stepText}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className={styles.section} id="formats">
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Output formats</div>
          <div className={styles.sectionTitle}>EVERY FORMAT YOUR SHOP NEEDS</div>
          <div className={styles.formatsGrid}>
            {[
              { ext: 'SVG', desc: 'Web & Design', badge: 'Universal' },
              { ext: 'EPS', desc: 'Print & Vinyl', badge: 'Industry std' },
              { ext: 'DXF', desc: 'CNC & Routing', badge: 'Machine-ready' },
              { ext: 'AI', desc: 'Illustrator', badge: 'Editable' },
              { ext: 'PDF', desc: 'Print-ready', badge: 'Press-ready' },
              { ext: 'PNG', desc: 'High-res raster', badge: 'Up to 8000px' },
            ].map((f, i) => (
              <div key={i} className={styles.formatCard}>
                <div className={styles.formatExt}>{f.ext}</div>
                <div className={styles.formatDesc}>{f.desc}</div>
                <div className={styles.formatBadge}>{f.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className={styles.section} id="pricing">
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Pricing</div>
          <div className={styles.sectionTitle}>STRAIGHTFORWARD PLANS</div>
          <div className={styles.pricingSubtitle}>All paid plans include a 14-day free trial. No credit card required to register.</div>

          <div className={styles.pricingGrid4}>

            <div className={styles.priceCard}>
              <div className={styles.planName}>Free</div>
              <div className={styles.planPrice}><sup>£</sup>0</div>
              <div className={styles.planPeriod}>1 trace on registration</div>
              <ul className={styles.planFeatures}>
                <li>1 free trace</li>
                <li>SVG &amp; PNG output</li>
                <li>Max 5MB file size</li>
                <li>Community support</li>
              </ul>
              <Link href="/sign-up" className={styles.btnGhost} style={{display:'block',textAlign:'center'}}>Get Started Free</Link>
            </div>

            <div className={styles.priceCard}>
              <div className={styles.planName}>Hobby</div>
              <div className={styles.planPrice}><sup>£</sup>19</div>
              <div className={styles.planPeriod}>per month · billed monthly</div>
              <ul className={styles.planFeatures}>
                <li className={styles.highlight}>50 traces / month</li>
                <li className={styles.highlight}>SVG, EPS &amp; PDF output</li>
                <li className={styles.highlight}>Max 10MB file size</li>
                <li className={styles.highlight}>Email support</li>
                <li>Single user</li>
              </ul>
              <HobbyButton className={styles.btnGhost} style={{display:'block',textAlign:'center',width:'100%',cursor:'pointer'}} />
            </div>

            <div className={`${styles.priceCard} ${styles.featured}`}>
              <div className={styles.priceBadge}>Most Popular</div>
              <div className={styles.planName}>Pro</div>
              <div className={styles.planPrice}><sup>£</sup>39</div>
              <div className={styles.planPeriod}>per month · billed monthly</div>
              <ul className={styles.planFeatures}>
                <li className={styles.highlight}>150 traces / month</li>
                <li className={styles.highlight}>All 6 output formats</li>
                <li className={styles.highlight}>Colour separation</li>
                <li className={styles.highlight}>Batch upload (up to 20)</li>
                <li className={styles.highlight}>Priority email support</li>
                <li>Max 30MB file size</li>
              </ul>
              <ProButton className={styles.btnPrimary} style={{display:'block',textAlign:'center',width:'100%',cursor:'pointer'}} />
            </div>

            <div className={styles.priceCard}>
              <div className={styles.planName}>Studio</div>
              <div className={styles.planPrice}><sup>£</sup>79</div>
              <div className={styles.planPeriod}>per month · billed monthly</div>
              <ul className={styles.planFeatures}>
                <li className={styles.highlight}>350 traces / month</li>
                <li className={styles.highlight}>All 6 output formats</li>
                <li className={styles.highlight}>Colour separation</li>
                <li className={styles.highlight}>Batch upload (up to 50)</li>
                <li className={styles.highlight}>API access</li>
                <li className={styles.highlight}>Priority support &amp; onboarding</li>
              </ul>
              <StudioButton className={styles.btnGhost} style={{display:'block',textAlign:'center',width:'100%',cursor:'pointer'}} />
            </div>

          </div>
          <div className={styles.pricingAgency}>
            <div className={styles.agencyLeft}>
              <strong>Agency / High Volume?</strong>
              <span>Need 750+ traces/month, white-label, or a custom API plan? We&apos;ll build a package around your volume.</span>
            </div>
            <a href="mailto:hello@easyvector.ai" className={styles.btnPrimary}>Contact Us — £149+/mo</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>From the trade</div>
          <div className={styles.sectionTitle}>PROFESSIONALS SPEAK</div>
          <div className={styles.testiGrid}>
            {[
              { text: 'Finally a vectoriser that understands what a sign shop actually needs. The DXF output goes straight into our MultiCam with zero manual cleanup.', name: 'Jason Herrick', role: 'Herrick Signs — Sheffield' },
              { text: 'The colour separation alone saves me 20 minutes per job. I put in a JPEG logo, it comes out in three perfectly separated layers ready to weed.', name: 'Maria Papadopoulos', role: 'Bright Wraps — Bristol' },
              { text: 'We integrated the API into our customer portal in a day. Clients upload their logos and get vectors back instantly — we only touch the file at production.', name: 'Dan Okafor', role: 'SignSystems Group — Manchester' },
            ].map((t, i) => (
              <div key={i} className={styles.testiCard}>
                <p className={styles.testiText}>{t.text}</p>
                <div className={styles.testiAuthor}>{t.name}</div>
                <div className={styles.testiRole}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.wrap}>
          <h2>READY TO TRACE?</h2>
          <p>Join sign makers, exhibition stand builders, print shops and promo gift suppliers who&apos;ve made client artwork headaches a thing of the past.</p>
          <Link href="/sign-up" className={styles.btnPrimary}>Register Free — Get Your First Trace</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <Image src="/logo.svg" alt="EasyVector.ai" width={220} height={42} />
        <ul className={styles.footerLinks}>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/terms">Terms</Link></li>
          <li><Link href="/how-it-works">How It Works</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
        <div className={styles.footerSocials}>
          <a href="https://www.linkedin.com/in/easy-vector-946a4b414/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://www.facebook.com/easyvectorai/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/vectoreasily/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://www.youtube.com/@easyvectorai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000"/></svg>
          </a>
        </div>
      </footer>

    </div>
  );
}
