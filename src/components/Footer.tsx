import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-bone/10 pt-16">
      {/* Nombre grande en contorno; al pasar el cursor se rellena de azul */}
      <p
        aria-hidden="true"
        className="select-none text-center font-serif text-[clamp(3.5rem,17vw,15rem)] font-light italic leading-[0.9] tracking-tight text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_rgba(235,230,220,0.4)] hover:text-ultra hover:[-webkit-text-stroke-color:#4f5bff]"
      >
        mcobromucho
      </p>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-8 px-6 pb-12 text-sm text-bone/55 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-7">
          <Image
            src="/logomc-completo-dolar.png"
            alt={site.artist}
            width={1332}
            height={957}
            className="h-16 w-auto"
          />
          <Image
            src="/logo-jt.png"
            alt="Monograma JT"
            width={800}
            height={570}
            className="h-14 w-auto opacity-80"
          />
        </div>
        <div className="sm:text-right">
          <p>© 2026 {site.artist}. Todas las obras son originales.</p>
          <a href={`mailto:${site.email}`} className="hover:text-bone">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
