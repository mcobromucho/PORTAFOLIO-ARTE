import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-sm text-bone/55 sm:flex-row sm:items-center sm:justify-between">
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