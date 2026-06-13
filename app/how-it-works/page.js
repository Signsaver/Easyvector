import Link from 'next/link';
import Image from 'next/image';
import styles from './how-it-works.module.css';

export const metadata = {
  title: 'How It Works — EasyVector.ai',
  description: 'How EasyVector.ai converts bitmap images to production-ready vectors for sign makers, print shops and CNC professionals.',
};

export default function HowItWorksPage() {
  return (
    <div className={styles.page}>

      {/* NAV */}
      <nav className={styles.nav}>
        <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={280} height={52} priority /></Link>
        <ul className={styles.navLinks}>
          <li><Link href="/#features">Features</Link></li>
          <li><Link href="/#pricing">Pricing</Link></li>
          <li><Link href="/support">Support</Link></li>
        </ul>
        <div className={styles.navActions}>
          <Link href="/sign-in" className={styles.navSignIn}>Sign In</Link>
          <Link href="/sign-up" className={styles.navCta}>Try Free — Register</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>The full picture</div>
          <h1>HOW <span>EASYVECTOR</span> WORKS</h1>
          <p className={styles.heroSub}>From a client&apos;s dodgy PNG to a production-ready vector — here&apos;s everything you need to know.</p>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>The problem we solve</div>
          <div className={styles.sectionTitle}>THE AI LOGO HEADACHE</div>
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>😤</div>
              <h3>Client sends a PNG</h3>
              <p>They found it online, generated it with AI, or screenshotted it from a website. It looks great at small size — but zoom in and it&apos;s just a grid of blurry pixels.</p>
            </div>
            <div className={styles.problemArrow}>→</div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>😰</div>
              <h3>You can&apos;t use it</h3>
              <p>Your vinyl cutter, CNC router, laser cutter, or large format printer needs vector paths — not pixels. There are no nodes, no curves, nothing to work with.</p>
            </div>
            <div className={styles.problemArrow}>→</div>
            <div className={styles.problemCard}>
              <div className={styles.problemIcon}>⚡</div>
              <h3>EasyVector fixes it</h3>
              <p>Upload the PNG. Download a clean SVG, EPS, DXF or PDF in seconds. No redrawing in Illustrator. No wasted hours. Just production-ready vectors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PIXELS VS VECTORS */}
      <section className={styles.sectionAlt}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Understanding the difference</div>
          <div className={styles.sectionTitle}>PIXELS VS VECTORS</div>
          <div className={styles.compareGrid}>
            <div className={styles.compareCard}>
              <div className={styles.compareHeader} style={{background:'rgba(248,113,113,0.1)', borderColor:'rgba(248,113,113,0.3)'}}>
                <span style={{fontSize:'2rem'}}>🖼️</span>
                <h3 style={{color:'#f87171'}}>BITMAP / RASTER</h3>
                <p>PNG, JPG, GIF, WebP, BMP</p>
              </div>
              <ul className={styles.compareList}>
                <li className={styles.bad}>Fixed resolution — goes blurry when scaled up</li>
                <li className={styles.bad}>No paths or nodes — can&apos;t be edited as shapes</li>
                <li className={styles.bad}>Unusable in cutting plotters and CNC software</li>
                <li className={styles.bad}>Large file sizes at high resolution</li>
                <li className={styles.bad}>AI-generated images always start as bitmaps</li>
              </ul>
            </div>
            <div className={styles.compareCard}>
              <div className={styles.compareHeader} style={{background:'rgba(74,222,128,0.1)', borderColor:'rgba(74,222,128,0.3)'}}>
                <span style={{fontSize:'2rem'}}>✏️</span>
                <h3 style={{color:'#4ade80'}}>VECTOR</h3>
                <p>SVG, EPS, DXF, PDF, AI</p>
              </div>
              <ul className={styles.compareList}>
                <li className={styles.good}>Infinitely scalable — crisp at any size</li>
                <li className={styles.good}>Mathematical paths — fully editable in any software</li>
                <li className={styles.good}>Works directly in Flexi, CorelDRAW, Illustrator</li>
                <li className={styles.good}>DXF format for CNC routers, plasma cutters, lasers</li>
                <li className={styles.good}>Small file sizes, print and cut ready</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Step by step</div>
          <div className={styles.sectionTitle}>FROM UPLOAD TO DOWNLOAD</div>
          <div className={styles.processSteps}>
            {[
              {
                n: '01',
                icon: '📁',
                title: 'Register & get your free trace',
                body: 'Create your account in seconds — no credit card required. You get 1 free production trace immediately so you can test the quality before committing.',
              },
              {
                n: '02',
                icon: '⬆️',
                title: 'Upload your bitmap image',
                body: 'Drag and drop any PNG, JPG, GIF, WebP or BMP. Files are automatically resized if they exceed the processing limit — no manual prep needed.',
              },
              {
                n: '03',
                icon: '⚙️',
                title: 'Choose your settings',
                body: 'Select your output format (SVG, DXF, EPS, PDF), processing mode (Test for free preview, Production for full quality), and colour mode (Auto, Full Colour, or Black & White).',
              },
              {
                n: '04',
                icon: '🤖',
                title: 'AI does the work',
                body: 'Our engine analyses the pixel data, identifies edges and shapes, fits smooth Bezier curves, and builds clean vector paths — all in under 8 seconds on average.',
              },
              {
                n: '05',
                icon: '⬇️',
                title: 'Download & use immediately',
                body: 'Your vector downloads instantly. Open it straight in CorelDRAW, Illustrator, Flexi, or your CNC software. No cleanup required.',
              },
            ].map((step, i) => (
              <div key={i} className={styles.processStep}>
                <div className={styles.processNum}>{step.n}</div>
                <div className={styles.processIcon}>{step.icon}</div>
                <div className={styles.processContent}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTPUT FORMATS */}
      <section className={styles.sectionAlt}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Output formats explained</div>
          <div className={styles.sectionTitle}>WHICH FORMAT DO I NEED?</div>
          <div className={styles.formatsGrid}>
            {[
              { ext: 'SVG', colour: '#f5820a', title: 'Web & Design', uses: ['Websites & apps', 'Adobe Illustrator', 'Inkscape', 'Canva Pro'], best: 'Universal format — use this if unsure' },
              { ext: 'EPS', colour: '#ffaa45', title: 'Print & Vinyl', uses: ['Vinyl cutters & plotters', 'Screen printing', 'Large format print', 'CorelDRAW & Flexi'], best: 'Industry standard for sign & print' },
              { ext: 'DXF', colour: '#4ade80', title: 'CNC & Fabrication', uses: ['CNC routers', 'Plasma cutters', 'Laser cutters', 'Waterjet machines'], best: 'Machine-ready format for fabrication' },
              { ext: 'PDF', colour: '#60a5fa', title: 'Universal Print', uses: ['Print-ready files', 'Client proofs', 'Archiving', 'Any PDF viewer'], best: 'Best for sending to clients or printers' },
              { ext: 'AI', colour: '#c084fc', title: 'Adobe Illustrator', uses: ['Full Illustrator editing', 'Layer control', 'Creative workflows', 'Agency use'], best: 'Best if your team uses Illustrator' },
              { ext: 'PNG', colour: '#94a3b8', title: 'High-Res Raster', uses: ['Social media', 'Presentations', 'Web use', 'Up to 8000px'], best: 'Cleaned-up bitmap — not a vector' },
            ].map((f, i) => (
              <div key={i} className={styles.formatCard}>
                <div className={styles.formatExt} style={{color: f.colour, borderColor: f.colour}}>{f.ext}</div>
                <div className={styles.formatTitle}>{f.title}</div>
                <ul className={styles.formatUses}>
                  {f.uses.map((u, j) => <li key={j}>{u}</li>)}
                </ul>
                <div className={styles.formatBest}>{f.best}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Who uses EasyVector</div>
          <div className={styles.sectionTitle}>BUILT FOR THE TRADE</div>
          <div className={styles.audienceGrid}>
            {[
              { icon: '/signmaker_icon.png', title: 'Sign Makers', body: 'Convert client-supplied PNGs and AI logos to clean vectors for vinyl cutting, routing, and large format printing — without redrawing anything.' },
              { icon: '/Large_format_print_icon.png', title: 'Large Format', body: 'Stop turning away jobs because artwork is low-res or bitmap-only. EasyVector gets files print-ready in seconds.' },
              { icon: '/cnc_laser_icon.png', title: 'CNC & Fabrication', body: 'Get clean DXF files ready for your router, plasma cutter, or laser. Closed paths, correct winding order, no stray nodes.' },
              { icon: '/promo_gifts_icon.png', title: 'Promo & Gifts', body: 'Prepare artwork for embroidery digitising, engraving, and promotional product decoration from any source image.' },
              { icon: '/exhibition_stand_build_icon.png', title: 'Exhibition Builders', body: 'Convert client brand assets to scalable vectors for large-format graphics, fabricated signage, and display systems.' },
              { icon: '/graphic_design_icon.png', title: 'Studios & Agencies', body: 'Use our API to integrate vectorization directly into your artwork upload portal. Automate the whole workflow.' },
            ].map((a, i) => (
              <div key={i} className={styles.audienceCard}>
                <div className={styles.audienceImageWrap}>
                  <img src={a.icon} alt={a.title} className={styles.audienceImage} />
                </div>
                <div className={styles.audienceBody}>
                  <h3>{a.title}</h3>
                  <p>{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.sectionAlt}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>Common questions</div>
          <div className={styles.sectionTitle}>QUICK ANSWERS</div>
          <div className={styles.faqGrid}>
            {[
              { q: 'How good is the output quality?', a: 'Very good for logos, illustrations, icons, and simple artwork. Complex photographic images will produce a stylised vector interpretation rather than a photorealistic result — which is normal for any vectorization tool.' },
              { q: 'What\'s the difference between Test and Production mode?', a: 'Test mode is completely free and produces a watermarked preview so you can check quality before spending a credit. Production mode uses 1 credit and delivers a clean, full-resolution vector with no watermark.' },
              { q: 'How many credits do I need?', a: 'Each vectorization uses 1 credit. A typical sign shop processing 5–10 client files per day would suit our Pro plan (150 credits/month). Occasional users often start on Hobby (50/month).' },
              { q: 'Can I use it for AI-generated artwork?', a: 'Yes — this is one of the core use cases. AI image tools like Midjourney, DALL-E and Adobe Firefly output PNG or JPG files. EasyVector converts these to usable vectors instantly.' },
              { q: 'Is there an API for automation?', a: 'Yes. Our Studio and Agency plans include API access so you can integrate vectorization directly into your own systems and customer portals.' },
              { q: 'What if the result isn\'t what I expected?', a: 'Use Test mode first to preview the result before spending a credit. If you have an issue with a production trace, contact us at hello@easyvector.ai and we\'ll help.' },
            ].map((faq, i) => (
              <div key={i} className={styles.faqCard}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.wrap}>
          <h2>READY TO STOP REDRAWING?</h2>
          <p>Join sign makers, print shops and fabricators who&apos;ve made client artwork headaches a thing of the past.</p>
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
      </footer>

    </div>
  );
}
