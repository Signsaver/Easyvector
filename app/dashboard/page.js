'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { resumeCheckoutIfPending } from '../components/CheckoutButtons';
import { getCurrency, PRICES } from '../lib/pricing';

const MAX_MEGAPIXELS = 2.8;

const PROFESSION_MODES = [
  {
    id: 'signmaker',
    label: 'Sign maker',
    photo: '/signmaker_icon.png',
    defaultFormat: 'svg',
    apiMode: 'production',
    badge: 'Sign maker — SVG / DXF / EPS',
  },
  {
    id: 'exhibition',
    label: 'Exhibition build',
    photo: '/exhibition_stand_build_icon.png',
    defaultFormat: 'pdf',
    apiMode: 'production',
    badge: 'Exhibition build — PDF / EPS',
  },
  {
    id: 'largeformat',
    label: 'Large format',
    photo: '/Large_format_print_icon.png',
    defaultFormat: 'pdf',
    apiMode: 'production',
    badge: 'Large format — PDF / EPS',
  },
  {
    id: 'cnc',
    label: 'CNC / laser / plasma',
    photo: '/cnc_laser_icon.png',
    defaultFormat: 'dxf',
    apiMode: 'production',
    badge: 'CNC / Laser / Plasma / Waterjet — DXF',
  },
  {
    id: 'embroidery',
    label: 'Embroidery & clothing',
    photo: '/embroidery_clothing_icon.png',
    defaultFormat: 'eps',
    apiMode: 'production',
    badge: 'Embroidery & clothing — EPS',
  },
  {
    id: 'promo',
    label: 'Promo gifts',
    photo: '/promo_gifts_icon.png',
    defaultFormat: 'svg',
    apiMode: 'production',
    badge: 'Promo gifts — SVG / PDF',
  },
  {
    id: 'screenprint',
    label: 'Screen print',
    photo: '/screen_printing_icon.png',
    defaultFormat: 'eps',
    apiMode: 'production',
    badge: 'Screen print — EPS / PDF',
  },
  {
    id: 'general',
    label: 'General / designer',
    photo: '/graphic_design_icon.png',
    defaultFormat: 'svg',
    apiMode: 'production',
    badge: 'General / designer — SVG',
  },
];

async function resizeImageIfNeeded(file) {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const megapixels = (img.width * img.height) / 1_000_000;
      if (megapixels <= MAX_MEGAPIXELS) {
        URL.revokeObjectURL(url);
        resolve(file);
        return;
      }
      const scale = Math.sqrt((MAX_MEGAPIXELS * 1_000_000) / (img.width * img.height));
      const newWidth = Math.floor(img.width * scale);
      const newHeight = Math.floor(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, { type: 'image/jpeg' });
        resolve(resizedFile);
      }, 'image/jpeg', 0.92);
    };
    img.src = url;
  });
}

export default function Dashboard() {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processLabel, setProcessLabel] = useState('');
  const [error, setError] = useState('');
  const [format, setFormat] = useState('svg');
  const [mode, setMode] = useState('production');
  const [colour, setColour] = useState('');
  const [dragover, setDragover] = useState(false);
  const [credits, setCredits] = useState(null);
  const [plan, setPlan] = useState('free');
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [resized, setResized] = useState(false);
  const [professionMode, setProfessionMode] = useState(PROFESSION_MODES[0]);
  const [prices, setPrices] = useState(PRICES.GBP);
  const fileRef = useRef();

  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch('/api/credits');
        const data = await res.json();
        if (data.credits !== undefined) {
          setCredits(data.credits);
          setPlan(data.plan || 'free');
        }
      } catch (err) {
        console.error('Failed to fetch credits:', err);
      } finally {
        setLoadingCredits(false);
      }
    }
    fetchCredits();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('success') === 'true') {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', {
            'send_to': 'AW-861109733/Dey2CKvS5rocEOX7zZoD'
          });
        }
        window.history.replaceState({}, '', '/dashboard');
      }
    }
  }, []);

  useEffect(() => {
    resumeCheckoutIfPending();
  }, []);

  useEffect(() => {
    getCurrency().then(currency => setPrices(PRICES[currency]));
  }, []);

  const isFreePlan = plan === 'free';
  const freeTracesLeft = credits ?? 0;
  const s = prices.symbol;

  function selectProfessionMode(pm) {
    setProfessionMode(pm);
    setFormat(pm.defaultFormat);
    setMode(pm.apiMode);
  }

  async function handleFile(f) {
    if (!f || !f.type.startsWith('image/')) return;
    setResized(false);
    const originalMegapixels = await new Promise((resolve) => {
      const img = document.createElement('img');
      const url = URL.createObjectURL(f);
      img.onload = () => { URL.revokeObjectURL(url); resolve((img.width * img.height) / 1_000_000); };
      img.src = url;
    });
    let processedFile = f;
    if (originalMegapixels > MAX_MEGAPIXELS) {
      processedFile = await resizeImageIfNeeded(f);
      setResized(true);
    }
    setFile(processedFile);
    setPreview(URL.createObjectURL(processedFile));
    setResult(null);
    setResultUrl(null);
    setError('');
  }

  async function handleTrace() {
    if (!file || processing) return;
    if (freeTracesLeft <= 0) {
      setError('You have no credits remaining. Please upgrade to continue.');
      return;
    }

    setProcessing(true);
    setError('');
    setResult(null);
    setResultUrl(null);

    const steps = [
      'Analysing pixel edges…',
      'Fitting geometric shapes…',
      'Optimising bezier curves…',
      'Building vector paths…',
      'Finalising output…'
    ];
    let si = 0;
    setProcessLabel(steps[0]);
    const iv = setInterval(() => {
      si++;
      setProcessLabel(steps[si % steps.length]);
    }, 1400);

    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('mode', mode);
      if (colour) fd.append('processing.palette', colour);
      if (format !== 'svg') fd.append('output.file_format', format);

      const resp = await fetch('/api/vectorize', { method: 'POST', body: fd });
      clearInterval(iv);

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || 'Vectorization failed');
      }

      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      setResult(blob);
      setResultUrl(url);

      const deductRes = await fetch('/api/credits', { method: 'POST' });
      const deductData = await deductRes.json();
      if (deductData.credits !== undefined) {
        setCredits(deductData.credits);
        setPlan(deductData.plan || 'free');
      }

    } catch (err) {
      clearInterval(iv);
      setError(err.message);
    }

    setProcessing(false);
  }

  return (
    <div className={styles.page}>

      {/* NAV */}
      <nav className={styles.nav}>
        <Link href="/"><Image src="/logo.svg" alt="EasyVector.ai" width={220} height={42} priority /></Link>
        <div className={styles.navRight}>
          <div className={styles.planBadge}>
            {loadingCredits ? '...' : isFreePlan ? `Free — ${freeTracesLeft} trace${freeTracesLeft !== 1 ? 's' : ''} left` : `${plan} — ${freeTracesLeft} traces left`}
          </div>
          {isFreePlan && (
            <a href="/#pricing" className={styles.upgradeBtn}>Upgrade</a>
          )}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonPopoverCard: {
                  background: '#1a1d1f',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                },
                userButtonPopoverActionButton: { color: '#f0ede8' },
                userButtonPopoverActionButtonText: { color: '#f0ede8' },
                userButtonPopoverActionButtonIcon: { color: '#888580' },
                userButtonPopoverFooter: {
                  background: '#1a1d1f',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                },
                userPreviewMainIdentifier: { color: '#f0ede8' },
                userPreviewSecondaryIdentifier: { color: '#888580' },
              }
            }}
          />
        </div>
      </nav>

      <div className={styles.wrap}>

        {/* WELCOME */}
        <div className={styles.welcome}>
          <h1>Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!</h1>
          <p>Select your trade, upload a bitmap, and download a perfect vector in seconds.</p>
        </div>

        {/* FREE TRIAL BANNER */}
        {isFreePlan && freeTracesLeft > 0 && (
          <div className={styles.freeBanner}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>You have <strong>{freeTracesLeft} free trace{freeTracesLeft !== 1 ? 's' : ''}</strong> — try it now, no credit card needed!</span>
          </div>
        )}

        {/* UPGRADE BANNER */}
        {freeTracesLeft <= 0 && (
          <div className={styles.upgradeBanner}>
            <div>
              <strong>No credits remaining!</strong>
              <p>Upgrade to get more traces and all output formats. Plans from {s}{prices.hobby}/mo.</p>
            </div>
            <a href="/#pricing" className={styles.upgradeBannerBtn}>View Plans →</a>
          </div>
        )}

        {/* PROFESSION MODE SELECTOR */}
        <div className={styles.modeSection}>
          <p className={styles.modeLabel}>Select your trade</p>
          <div className={styles.modeGrid}>
            {PROFESSION_MODES.map((pm) => (
              <button
                key={pm.id}
                className={`${styles.modeCard} ${professionMode.id === pm.id ? styles.modeCardActive : ''}`}
                onClick={() => selectProfessionMode(pm)}
                style={{ backgroundImage: `url(${pm.photo})` }}
              >
                <span className={styles.modeOverlay}></span>
                <span className={styles.modeName}>{pm.label}</span>
              </button>
            ))}
          </div>
          <div className={styles.modeBadge}>
            {professionMode.badge}
          </div>
        </div>

        {/* CONTROLS */}
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Output Format</label>
            <select value={format} onChange={e => setFormat(e.target.value)}>
              <option value="svg">SVG — Web &amp; Design</option>
              <option value="dxf">DXF — CNC / Router / Laser</option>
              <option value="eps">EPS — Print &amp; Embroidery</option>
              <option value="pdf">PDF — Universal</option>
            </select>
          </div>
          <div className={styles.controlGroup}>
            <label>Colour Mode</label>
            <select value={colour} onChange={e => setColour(e.target.value)}>
              <option value="">Auto Detect</option>
              <option value="color">Full Colour</option>
              <option value="black_and_white">Black &amp; White</option>
            </select>
          </div>
          <button
            className={styles.traceBtn}
            onClick={handleTrace}
            disabled={!file || processing || freeTracesLeft <= 0}
          >
            {processing ? 'Tracing…' : 'Trace Image'}
          </button>
        </div>

        {/* RESIZED NOTICE */}
        {resized && (
          <div style={{background:'rgba(245,130,10,0.08)', border:'1px solid rgba(245,130,10,0.2)', borderRadius:'8px', padding:'0.7rem 1.25rem', fontSize:'0.82rem', color:'#ffaa45', marginBottom:'1rem'}}>
            ℹ Image was automatically resized to fit the 3MP limit — quality is preserved.
          </div>
        )}

        {/* ERROR */}
        {error && <div className={styles.errorBanner}>⚠ {error}</div>}

        {/* WORKSPACE */}
        <div className={styles.workspace}>
          {/* INPUT */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>Input — Bitmap</span>
              <span className={styles.panelStatus}>
                <span className={`${styles.dot} ${file ? styles.dotActive : ''}`}></span>
                <span>{file ? file.name.substring(0, 22) : 'Awaiting upload'}</span>
              </span>
            </div>
            <div className={styles.panelBody}>
              {!preview ? (
                <div
                  className={`${styles.dropZone} ${dragover ? styles.dragover : ''}`}
                  onClick={() => fileRef.current.click()}
                  onDragOver={e => { e.preventDefault(); setDragover(true); }}
                  onDragLeave={() => setDragover(false)}
                  onDrop={e => { e.preventDefault(); setDragover(false); handleFile(e.dataTransfer.files[0]); }}
                >
                  <div className={styles.dropIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <div className={styles.dropText}>
                    <strong>Drop image here</strong>
                    <span>or click to browse</span>
                  </div>
                  <div className={styles.dropFormats}>JPG · PNG · BMP · WEBP · GIF</div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.bmp,.webp,.gif"
                    style={{ display: 'none' }}
                    onChange={e => handleFile(e.target.files[0])}
                  />
                </div>
              ) : (
                <div className={styles.previewWrap}>
                  <img src={preview} alt="Input" className={styles.previewImg} />
                  <button className={styles.clearBtn} onClick={() => { setFile(null); setPreview(null); setResult(null); setResultUrl(null); setResized(false); }}>
                    ✕ Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* OUTPUT */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>Output — Vector</span>
              <span className={styles.panelStatus}>
                <span className={`${styles.dot} ${resultUrl ? styles.dotActive : processing ? styles.dotProcessing : ''}`}></span>
                <span>{processing ? 'Tracing…' : resultUrl ? 'Done!' : 'Waiting for trace'}</span>
              </span>
            </div>
            <div className={styles.panelBody}>
              {processing && (
                <div className={styles.processingWrap}>
                  <div className={styles.scanWrap}><div className={styles.scanBar}></div></div>
                  <div className={styles.processLabel}>{processLabel}</div>
                </div>
              )}
              {!processing && !resultUrl && (
                <div className={styles.resultPlaceholder}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="44" height="44">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                  <p>Your vector will appear here</p>
                </div>
              )}
              {!processing && resultUrl && (
                <div className={styles.resultWrap}>
                 {format !== 'svg' ? (
                    <div className={styles.pdfReady}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                     <p>{format.toUpperCase()} ready — use the download button below</p>
                    </div>
                  ) : (
                    <img src={resultUrl} alt="Vector result" className={styles.resultImg} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DOWNLOAD BAR */}
        {resultUrl && (
          <div className={styles.downloadBar}>
            <div className={styles.downloadInfo}>
              <strong>easyvector-result.{format}</strong>
              <span>{result ? (result.size / 1024).toFixed(1) + ' KB' : ''} · {format.toUpperCase()} · Ready</span>
            </div>
            <div className={styles.downloadActions}>
              <a className={styles.downloadBtn} href={resultUrl} download={`easyvector-result.${format}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download {format.toUpperCase()}
              </a>
              <button className={styles.newTraceBtn} onClick={() => { setFile(null); setPreview(null); setResult(null); setResultUrl(null); setResized(false); }}>
                New Trace
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
