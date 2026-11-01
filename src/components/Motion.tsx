"use client";

import { useEffect } from "react";

/**
 * Capa de animaciones global. No cambia contenido, enlaces ni Stripe:
 * solo agrega clases temporales, una barra de progreso y un cursor.
 * Se apaga sola si el usuario pidió "reducir movimiento".
 */
export default function Motion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("js-motion");
    const undo: Array<() => void> = [() => root.classList.remove("js-motion")];

    /* 1. Aparición al hacer scroll (el Hero tiene su propia entrada) */
    const sel = [
      "section:not(#inicio) h2",
      "section:not(#inicio) h3",
      "section:not(#inicio) p",
      "section:not(#inicio) li",
      "section:not(#inicio) article",
      "section:not(#inicio) form",
      "section:not(#inicio) img",
    ].join(",");
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
    els.forEach((el) => {
      const i = el.parentElement
        ? Array.from(el.parentElement.children).indexOf(el)
        : 0;
      el.style.setProperty("--d", String(Math.min(i, 6)));
      el.classList.add("mm-rv");
    });
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("mm-in");
          io.unobserve(el);
          // Al terminar, se devuelve el control a los estilos propios del elemento
          timers.push(
            window.setTimeout(() => {
              el.classList.remove("mm-rv", "mm-in");
              el.style.removeProperty("--d");
            }, 1600)
          );
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    undo.push(() => {
      io.disconnect();
      timers.forEach(clearTimeout);
    });

    /* 2. Barra de progreso */
    const bar = document.createElement("div");
    bar.className = "mm-bar";
    document.body.appendChild(bar);
    const onScroll = () => {
      const max = root.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    undo.push(() => {
      removeEventListener("scroll", onScroll);
      bar.remove();
    });

    /* 3. Cursor propio (solo con ratón) */
    if (matchMedia("(pointer: fine)").matches) {
      const dot = document.createElement("div");
      const ring = document.createElement("div");
      dot.className = "mm-dot";
      ring.className = "mm-ring";
      document.body.append(dot, ring);
      let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
      const move = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px)`;
        const t = e.target as HTMLElement | null;
        ring.classList.toggle(
          "mm-big",
          !!t?.closest("a,button,img,[role=button]")
        );
      };
      const loop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = `translate(${rx}px,${ry}px)`;
        raf = requestAnimationFrame(loop);
      };
      addEventListener("pointermove", move);
      loop();
      undo.push(() => {
        removeEventListener("pointermove", move);
        cancelAnimationFrame(raf);
        dot.remove();
        ring.remove();
      });
    }

    return () => undo.forEach((f) => f());
  }, []);

  return null;
}
