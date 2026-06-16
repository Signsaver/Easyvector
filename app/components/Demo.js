'use client';

import { useEffect, useRef } from 'react';

const PALETTE = ['#DA4B26', '#1F9AA8', '#EFA722', '#C9437E', '#2E9C68'];
const DISC = '#16181C';
const ACCENT = '#C0411E';
const PIXEL_BLOCK = 9;
const ASPECT = 0.54;
const MAX_WIDTH = 640;

export default function Demo() {
  const stageRef = useRef(null);
  const afterRef = useRef(null);
  const beforeRef = useRef(null);
  const dividerRef = useRef(null);
  const handleRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const after = afterRef.current;
    const before = beforeRef.current;
    const divider = dividerRef.current;
    const handle = handleRef.current;
    if (!stage || !after || !before) return;

    const small = document.createElement('canvas');
    let curW = 0;
    let curH = 0;
    let divFrac = 0.52;
    let userMoved = false;
    let rafId = null;
    let nudgeStart = null;

    const rr = (ctx, x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const drawScene = (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);

      const n = PALETTE.length;
      const bw = w / n;
      for (let j = 0; j < n; j++) {
        ctx.fillStyle = PALETTE[j];
        ctx.fillRect(j * bw, 0, bw + 1, h);
      }

      const cx = w / 2;
      const cy = h / 2;
      const R = h * 0.4;

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
      ctx.fill();

      const ticks = 12;
      const inner = R * 0.66;
      const outer = R * 0.98;
      const tw = R * 0.17;
      const len = outer - inner;
      for (let i = 0; i < ticks; i++) {
        const a = -Math.PI / 2 + i * ((Math.PI * 2) / ticks);
        const mx = cx + Math.cos(a) * (inner + outer) / 2;
        const my = cy + Math.sin(a) * (inner + outer) / 2;
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(a + Math.PI / 2);
        ctx.fillStyle = PALETTE[i % PALETTE.length];
        rr(ctx, -tw / 2, -len / 2, tw, len, Math.min(tw, len) * 0.3);
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = DISC;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2);
      ctx.fill();

      const d = R * 0.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = d * 0.05;
      ctx.beginPath();
      ctx.moveTo(cx + d * 0.5, cy - d * 0.45);
      ctx.lineTo(cx + d * 0.62, cy - d * 0.7);
      ctx.stroke();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = d * 0.12;
      ctx.beginPath();
      ctx.moveTo(cx - d * 0.5, cy + d * 0.45);
      ctx.bezierCurveTo(
        cx - d * 0.05, cy + d * 0.55,
        cx + d * 0.05, cy - d * 0.55,
        cx + d * 0.5, cy - d * 0.45
      );
      ctx.stroke();
      ctx.fillStyle = ACCENT;
      ctx.beginPath();
      ctx.arc(cx + d * 0.62, cy - d * 0.7, d * 0.13, 0, Math.PI * 2);
      ctx.fill();
      const node = (x, y) => {
        const sz = d * 0.24;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
        ctx.fillStyle = DISC;
        const b = sz * 0.42;
        ctx.fillRect(x - b / 2, y - b / 2, b, b);
      };
      node(cx - d * 0.5, cy + d * 0.45);
      node(cx + d * 0.5, cy - d * 0.45);
    };

    const setDivider = (x) => {
      x = Math.max(14, Math.min(curW - 14, x));
      divFrac = x / curW;
      divider.style.left = x + 'px';
      handle.style.left = x + 'px';
      before.style.clipPath = 'inset(0 ' + (curW - x) + 'px 0 0)';
      stage.setAttribute('aria-valuenow', String(Math.round(divFrac * 100)));
    };

    const layout = () => {
      const W = Math.max(240, stage.clientWidth);
      const H = Math.round(W * ASPECT);
      stage.style.height = H + 'px';
      const dpr = window.devicePixelRatio || 1;

      after.width = Math.round(W * dpr);
      after.height = Math.round(H * dpr);
      const actx = after.getContext('2d');
      actx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawScene(actx, W, H);

      const sw = Math.max(40, Math.round(W / PIXEL_BLOCK));
      const sh = Math.max(20, Math.round(H / PIXEL_BLOCK));
      small.width = sw;
      small.height = sh;
      const sctx = small.getContext('2d');
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      drawScene(sctx, sw, sh);

      before.width = Math.round(W * dpr);
      before.height = Math.round(H * dpr);
      const bctx = before.getContext('2d');
      bctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.imageSmoothingEnabled = false;
      bctx.drawImage(small, 0, 0, sw, sh, 0, 0, before.width, before.height);

      curW = W;
      curH = H;
      setDivider(divFrac * W);
    };

    const localX = (e) => {
      const r = stage.getBoundingClientRect();
      const clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      return clientX - r.left;
    };

    const onDown = (e) => {
      userMoved = true;
      if (stage.setPointerCapture && e.pointerId != null) {
        try { stage.setPointerCapture(e.pointerId); } catch (_) {}
      }
      setDivider(localX(e));
    };

    const onMove = (e) => {
      if (e.buttons > 0 || e.pressure > 0) {
        userMoved = true;
        setDivider(localX(e));
      }
    };

    const onKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        userMoved = true;
        const step = (e.key === 'ArrowLeft' ? -0.04 : 0.04) * curW;
        setDivider(divFrac * curW + step);
        e.preventDefault();
      }
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('keydown', onKey);

    layout();

    let ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(layout);
      ro.observe(stage.parentNode || stage);
    }

    const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    const nudge = (ts) => {
      if (userMoved) return;
      if (!nudgeStart) nudgeStart = ts;
      const p = Math.min(1, (ts - nudgeStart) / 1700);
      const f = 0.62 - 0.24 * Math.sin(ease(p) * Math.PI);
      setDivider(f * curW);
      if (p < 1) rafId = requestAnimationFrame(nudge);
      else setDivider(0.5 * curW);
    };
    const
