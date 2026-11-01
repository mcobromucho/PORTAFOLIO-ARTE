"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Cambia el fondo del menú al bajar para mantener legibilidad
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // FUTURO (Framer Motion): reemplaza este <header> por <motion.header>
  // con initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
  // para una entrada suave al cargar la página.
  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
      <nav
        aria-label="Principal"
        className={`flex items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl transition-colors duration-500 ${
          scrolled
            ? "border-bone/15 bg-ink/80"
            : "border-bone/10 bg-ink/30"
        }`}
      >
        <a href="#inicio" aria-label={site.artist}>
  <Image
    src="/logomc-completo-dolar.png"
    alt={site.artist}
    width={1332}
    height={957}
    priority
    className="h-10 w-auto md:h-12"
  />
</a>

        <ul className="hidden items-center gap-7 text-sm text-bone/80 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition-colors hover:text-bone focus-visible:text-bone"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden rounded-full bg-ultra px-4 py-1.5 text-sm font-medium text-bone transition hover:brightness-110 md:inline-block"
          >
            Colaborar
          </a>
          <button
            type="button"
            className="text-sm text-bone/80 md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="menu-movil"
          className="mt-2 rounded-3xl border border-bone/10 bg-ink/90 p-5 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-4 text-lg">
            {[...site.nav, { label: "Colaborar", href: "#contacto" }].map(
              (item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}