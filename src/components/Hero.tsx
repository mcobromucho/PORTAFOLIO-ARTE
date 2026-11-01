"use client";

import { useRef } from "react";
import AmbientBg from "@/components/AmbientBg";

// Capa de color "pintada": solo se revela bajo el cursor.
const paint = `
  radial-gradient(38% 48% at 28% 42%, #ff5a36 0%, transparent 70%),
  radial-gradient(34% 44% at 72% 28%, #4f5bff 0%, transparent 70%),
  radial-gradient(40% 40% at 58% 78%, #f2c14e 0%, transparent 70%),
  #0c0c0d
`;

const proof = [
  "Arte contemporáneo",
  "Obra original",
  "Arte para tu hogar, proyecto o marca",
];

const headline = ["La", "vida", "no", "viene", "en", "colores", "discretos."];
const italicFrom = 5; // "colores discretos." va en cursiva

type Idx = React.CSSProperties & { "--i": number };

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Mueve el foco de luz siguiendo el puntero (funciona con ratón y dedo)
  function handleMove(e: React.PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={handleMove}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* Fondo animado de luz suave */}
      <AmbientBg />

      {/* Capa de color revelada por el foco de luz */}
      <div
        aria-hidden="true"
        className="spotlight-layer absolute inset-0"
        style={{ background: paint }}
      />
      {/* Velo oscuro para que el texto siempre se lea bien */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-40">
        <p
          className="hero-fade flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-bone/70"
          style={{ "--i": 0 } as Idx}
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rotate-45 bg-ultra"
          />
          Arte contemporáneo · Obra original
        </p>

        <h1
          aria-label={headline.join(" ")}
          className="mt-8 max-w-4xl font-serif text-5xl font-light leading-[1.02] sm:text-7xl lg:text-8xl"
        >
          {headline.map((w, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="-mb-[0.14em] mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-top"
            >
              <span
                className={`hero-word ${i >= italicFrom ? "italic" : ""}`}
                style={{ "--i": i + 1 } as Idx}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="hero-fade mt-8 max-w-2xl text-base leading-relaxed text-bone/75 sm:text-lg"
          style={{ "--i": 9 } as Idx}
        >
          Mcobromucho es un espacio dedicado a la venta y difusión de arte
          contemporáneo y obras originales. Acercamos el trabajo de Jair Trillo
          a coleccionistas y amantes del arte mediante una selección de pinturas
          y piezas gráficas, con asesoría personalizada y una experiencia de
          compra segura para quienes buscan incorporar arte a su colección,
          hogar o proyecto.
        </p>

        <p
          className="hero-fade mt-6 font-serif text-2xl italic text-bone"
          style={{ "--i": 10 } as Idx}
        >
          Arte para tu hogar, proyecto o marca.
        </p>

        <div
          className="hero-fade mt-10 flex flex-wrap gap-4"
          style={{ "--i": 11 } as Idx}
        >
          <a
            href="#coleccion"
            className="rounded-full bg-bone px-7 py-3 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            Ver la colección
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-bone/30 px-7 py-3 text-sm font-medium transition hover:-translate-y-0.5 hover:border-bone hover:bg-bone/5"
          >
            Proponer una alianza
          </a>
        </div>
      </div>

      {/* Cinta de texto */}
      <div className="relative overflow-hidden border-t border-bone/10 py-4">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-sm uppercase tracking-[0.2em] text-bone/60">
          {[...proof, ...proof, ...proof, ...proof].map((text, i) => (
            <span key={i} className="flex items-center gap-12">
              {text}
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rotate-45 bg-ultra"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
