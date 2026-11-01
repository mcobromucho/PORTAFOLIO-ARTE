import ArtworkCard from "@/components/ArtworkCard";
import Reveal from "@/components/Reveal";
import { artworks } from "@/data/artworks";

export default function Gallery() {
  return (
    <section id="coleccion" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <h2 className="font-serif text-4xl font-light sm:text-6xl">
          La colección
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-bone/70">
          Cada pieza es original, firmada y se envía con certificado de
          autenticidad.
        </p>
      </Reveal>

      {/* Rejilla asimétrica: la segunda columna baja para dar ritmo de galería.
          FUTURO: añade un lightbox (modal) para ampliar la obra a pantalla completa. */}
      <div className="mt-20 grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((art, i) => (
          <Reveal
            key={art.id}
            delay={i * 120}
            className={i % 3 === 1 ? "lg:mt-16" : ""}
          >
            <ArtworkCard artwork={art} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
