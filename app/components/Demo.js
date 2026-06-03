'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './Demo.module.css';

// Example images — pairs of [bitmap description, SVG path]
// We use inline SVGs as the "after" to show quality without API calls
const EXAMPLES = [
  {
    label: 'Company Logo',
    description: 'Typical client-supplied PNG logo',
    bitmap: '/demo/logo-bitmap.png',
    // Inline SVG shown as the vector result
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#f5820a" stroke-width="8"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#f5820a" stroke-width="4"/>
      <text x="100" y="95" text-anchor="middle" font-family="Arial Black" font-size="28" font-weight="900" fill="#f0ede8">EASY</text>
      <text x="100" y="125" text-anchor="middle" font-family="Arial Black" font-size="18" font-weight="900" fill="#f5820a">VECTOR</text>
      <line x1="40" y1="108" x2="75" y2="108" stroke="#f5820a" stroke-width="2"/>
      <line x1="125" y1="108" x2="160" y2="108" stroke="#f5820a" stroke-width="2"/>
    </svg>`,
  },
  {
    label: 'Sign Artwork',
    description: 'Vehicle wrap design ready for cutting',
    bitmap: '/demo/sign-bitmap.png',
    svgContent: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="280" height="130" rx="12" fill="none" stroke="#f5820a" stroke-width="6"/>
      <rect x="20" y="20" width="260" height="110" rx="8" fill="none" stroke="#f5820a" stroke-width="2" stroke-dasharray="8,4"/>
      <text x="150" y="75" text-anchor="middle" font-family="Arial Black" font-size="36" font-weight="900" fill="#f0ede8">OPEN</text>
      <text x="150" y="108" text-anchor="middle" font-family="Arial" font-size="14" fill="#888580" letter-spacing="6">24 HOURS</text>
      <circle cx="50" cy="75" r="20" fill="none" stroke="#f5820a" stroke-width="4"/>
      <circle cx="250" cy="75" r="20" fill="none" stroke="#f5820a" stroke-width="4"/>
    </svg>`,
  },
  {
    label: 'Promo Artwork',
    description: 'Embroidery & print-ready output',
    bitmap: '/demo/promo-bitmap.png',
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,15 120,70 180,70 130,105 150,160 100,125 50,160 70,105 20,70 80,70" fill="none" stroke="#f5820a" stroke-width="5" stroke-linejoin="round"/>
      <polygon points="100,40 114,82 158,82 122,107 136,149 100,124 64,149 78,107 42,82 86,82" fill="#f5820a" opacity="0.15"/>
      <text x="100" y="188" text-anchor="middle" font-family="Arial" font-size="11" fill="#888580" letter-spacing="3">PREMIUM</text>
    </svg>`,
  },
];

export default function Demo() {
  const [activeExample, setActiveExample] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef(null);
  const animRef = useRef(null);

  // Auto-animate the slider on load
  useEffect(() => {
    if (!isAnimating) return;
    let pos = 50;
    let dir = -1;
    let count = 0;
    animRef.current = setInterval(() => {
      pos += dir * 0.8;
      if (pos <= 15) { dir = 1; count++; }
      if (pos >= 85) { dir = -1; count++; }
      if (count >= 4) {
        clearInterval(animRef.current);
        setSliderPos(50);
        setIsAnimating(false);
        return;
      }
      setSliderPos(pos);
    }, 16);
    return () => clearInterval(animRef.current);
  }, [isAnimating, activeExample]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, [isDragging]);

  const handleTouchMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', () => setIsDragging(false));
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
    };
  }, [handleMouseMove]);

  function switchExample(idx) {
    setActiveExample(idx);
    setSliderPos(50);
    setIsAnimating(true);
  }

  const example = EXAMPLES[activeExample];

  return (
    <section className={styles.section} id="demo">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={styles.sectionLabel}>See it in action</div>
          <div className={styles.sectionTitle}>DRAG TO REVEAL THE VECTOR</div>
          <p className={styles.subtitle}>See exactly what EasyVector produces — drag the slider to compare bitmap vs clean vector output</p>
        </div>

        {/* Example tabs */}
        <div className={styles.tabs}>
          {EXAMPLES.map((ex, i) => (
            <button
              key={i}
              className={`${styles.tab} ${i === activeExample ? styles.tabActive : ''}`}
              onClick={() => switchExample(i)}
            >
              <span className={styles.tabLabel}>{ex.label}</span>
              <span className={styles.tabDesc}>{ex.description}</span>
            </button>
          ))}
        </div>

        {/* Slider comparison */}
        <div
          ref={containerRef}
          className={styles.compareWrap}
          onMouseDown={() => { setIsDragging(true); setIsAnimating(false); clearInterval(animRef.current); }}
          onTouchStart={() => { setIsAnimating(false); clearInterval(animRef.current); }}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER — Vector (full width background) */}
          <div className={styles.afterPanel}>
            <div className={styles.afterLabel}>
              <span className={styles.labelDot} style={{background:'var(--success)'}}></span>
              Vector Output
            </div>
            <div
              className={styles.svgDisplay}
              dangerouslySetInnerHTML={{ __html: example.svgContent }}
            />
          </div>

          {/* BEFORE — Bitmap (clipped to slider position) */}
          <div
            className={styles.beforePanel}
            style={{ width: `${sliderPos}%` }}
          >
            <div className={styles.beforeLabel}>
              <span className={styles.labelDot} style={{background:'var(--error)'}}></span>
              Original Bitmap
            </div>
            <div className={styles.bitmapDisplay}>
              {/* Simulated pixelated/blurry bitmap effect */}
              <div
                className={styles.svgDisplay}
                style={{ filter: 'blur(0.8px)', imageRendering: 'pixelated', opacity: 0.85 }}
                dangerouslySetInnerHTML={{ __html: example.svgContent }}
              />
              {/* Pixel grid overlay to simulate bitmap */}
              <div className={styles.pixelOverlay}></div>
            </div>
          </div>

          {/* Slider handle */}
          <div
            className={styles.sliderHandle}
            style={{ left: `${sliderPos}%` }}
          >
            <div className={styles.sliderLine}></div>
            <div className={styles.sliderKnob}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{transform:'scaleX(-1)'}}>
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </div>

          {/* Drag hint */}
          {isAnimating && (
            <div className={styles.dragHint}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 11V6.5a2.5 2.5 0 0 0-5 0v.5"/>
                <path d="M13 6V4.5a2.5 2.5 0 0 0-5 0V11"/>
                <path d="M8 11V7.5a2.5 2.5 0 0 0-5 0V17a5 5 0 0 0 5 5h2a5 5 0 0 0 5-5v-3"/>
              </svg>
              Drag to compare
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <div className={styles.statVal}>∞</div>
            <div className={styles.statLabel}>Scalable to any size</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statVal}>&lt;8s</div>
            <div className={styles.statLabel}>Processing time</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statVal}>6</div>
            <div className={styles.statLabel}>Export formats</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statVal}>0</div>
            <div className={styles.statLabel}>Manual cleanup needed</div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p>Impressed? Try it with your own images — first trace is completely free.</p>
          <Link href="/sign-up" className={styles.ctaBtn}>
            Register Free — Try Your Own Image →
          </Link>
        </div>
      </div>
    </section>
  );
}
