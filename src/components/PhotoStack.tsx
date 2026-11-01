"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Photo = { src: string; alt: string };

export default function PhotoStack({ photos }: { photos: Photo[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = photos.length;

  // Avance automático (se detiene al pasar el cursor y si se pidió menos movimiento)
  useEffect(() => {
    if (n < 2 || paused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 5500);
    return () => clearInterval(id);
  }, [n, paused, i]);

  return (
    <div
      className="group relative"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {/* Marco desfasado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 border border-ultra/40 transition-transform duration-700 group-hover:translate-x-5 group-hover:translate-y-5"
      />

      <div className="relative aspect-[3/4] overflow-hidden bg-bone/5">
        {photos.map((p, k) => (
          <Image
            key={p.src}
            src={p.src}
            alt={p.alt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            style={{
              opacity: k === i ? 1 : 0,
              transform: k === i ? "scale(1)" : "scale(1.08)",
              transition:
                "opacity 1.2s cubic-bezier(.16,1,.3,1), transform 6s ease-out",
            }}
          />
        ))}

        {/* Degradado inferior para leer contador y puntos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/70 to-transparent"
        />

        {n > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4 text-xs tracking-[0.2em] text-bone/80">
            <span aria-hidden="true">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {photos.map((p, k) => (
                <button
                  key={p.src}
                  type="button"
                  aria-label={`Ver foto ${k + 1} de ${n}`}
                  aria-current={k === i}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    k === i ? "w-7 bg-bone" : "w-1.5 bg-bone/40 hover:bg-bone/70"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
