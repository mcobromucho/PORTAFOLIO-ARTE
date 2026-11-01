"use client";

import { useRef } from "react";
import { site } from "@/lib/site";

// Capa de color "pintada": solo se revela bajo el cursor.
const paint = `
  radial-gradient(38% 48% at 28% 42%, #ff5a36 0%, transparent 70%),
  radial-gradient(34% 44% at 72% 28%, #4f5bff 0%, transparent 70%),
  radial-gradient(40% 40% at 58% 78%, #f2c14e 0%, transparent 70%),
  #0c0c0d
`;

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

  // FUTURO (React Three Fiber): sustituye el <div className="spotlight-layer">
  // por un <Canvas> de @react-three/fiber con un plano y un shader de
  // distorsión líquida que reaccione al puntero. Instalación:
  //   npm i three @react-three/fiber @react-three/drei
  // Cárgalo con next/dynamic({ ssr: false }) para no frenar la portada.
  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={handleMove}
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
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

      {/* FUTURO (Framer Motion): envuelve el contenido en <motion.div> con
          variants para escalonar la entrada del titular, subtítulo y botones
          (staggerChildren: 0.12). También sirve useScroll + useTransform para
          un paralaje suave del fondo al hacer scroll. */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-40">
        <h1 className="max-w-4xl font-serif text-5xl font-light leading-[1.02] sm:text-7xl lg:text-8xl">
          Arte que se queda en la memoria de quien lo mira.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/75">
          Pintura contemporánea para coleccionistas, espacios y marcas que
          quieren decir algo. Obras originales disponibles y alianzas abiertas.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#coleccion"
            className="rounded-full bg-bone px-7 py-3 text-sm font-medium text-ink transition hover:bg-white"
          >
            Ver la colección
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-bone/30 px-7 py-3 text-sm font-medium transition hover:border-bone hover:bg-bone/5"
          >
            Proponer una alianza
          </a>
        </div>
      </div>

      {/* Cinta de prueba social */}
      <div className="relative overflow-hidden border-t border-bone/10 py-4">
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-sm text-bone/60">
          {[...site.proof, ...site.proof].map((text, i) => (
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
