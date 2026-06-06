'use client';

import { useUser, UserButton } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

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
  const [mode, setMode] = useState('test');
  const [colour, setColour] = useState('');
  const [dragover, setDragover] = useState(false);
  const [credits, setCredits] = useState(null);
  const [plan, setPlan] = useState('free');
  const [loadingCredits, setLoadingCredits] = useState(true);
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

  const isFreePlan = plan === 'free';
  const freeTracesLeft = credits ?? 0;

  function handleFile(f) {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
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

      // Deduct credit from Supabase
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
          <p>Upload a bitmap image and download a perfect vector in seconds.</p>
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
              <p>Upgrade to get more traces and all output formats.</p>
            </div>
            <a href="/#pricing" className={styles.upgradeBannerBtn}>View Plans →</a>
          </div>
        )}

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
            <label>Processing Mode</label>
            <select value={mode} onChange={e => setMode(e.target.value)}>
              <option value="test">Test (Free — No credits)</option>
              <option value="production">Production (1 credit)</option>
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
                  <button className={styles.clearBtn} onClick={() => { setFile(null); setPreview(null); setResult(null); setResultUrl(null); }}>
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
                  <img src={resultUrl} alt="Vector result" className={styles.resultImg} />
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
              <button className={styles.newTraceBtn} onClick={() => { setFile(null); setPreview(null); setResult(null); setResultUrl(null); }}>
                New Trace
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
