"use client";

import { useEffect, useRef } from "react";

// Manchas de luz que derivan despacio y reaccionan al puntero.
// Usa los mismos colores que la capa "pintada" del Hero.
const blobs = [
  { c: "255,90,54", a: 0.13, sx: 0.9, sy: 0.7, px: 0.0, py: 1.3, r: 0.5 },
  { c: "79,91,255", a: 0.17, sx: 0.7, sy: 1.0, px: 2.1, py: 0.4, r: 0.55 },
  { c: "242,193,78", a: 0.1, sx: 1.0, sy: 0.6, px: 4.2, py: 2.6, r: 0.45 },
];

export default function AmbientBg({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0;
    let px = 0.5, py = 0.5, tx = 0.5, ty = 0.5;
    let visible = true, raf = 0;

    const fit = () => {
      const d = Math.min(devicePixelRatio || 1, 1.5);
      w = host.clientWidth;
      h = host.clientHeight;
      cv.width = Math.round(w * d);
      cv.height = Math.round(h * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
      if (reduce) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b, i) => {
        const k = (i + 1) * 0.4;
        const x = w * (0.5 + 0.34 * Math.sin(t * 0.00013 * b.sx + b.px)) + (px - 0.5) * 70 * k;
        const y = h * (0.5 + 0.3 * Math.cos(t * 0.00013 * b.sy + b.py)) + (py - 0.5) * 70 * k;
        const r = Math.max(w, h) * b.r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.c},${b.a * intensity})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      px += (tx - px) * 0.04;
      py += (ty - py) * 0.04;
      draw(t);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };

    const ro = new ResizeObserver(fit);
    ro.observe(host);
    fit();

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
    };
  }, [intensity]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
