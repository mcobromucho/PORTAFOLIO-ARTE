import Image from "next/image";
import BuyButton from "@/components/BuyButton";
import type { Artwork } from "@/data/artworks";

export default function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const price = new Intl.NumberFormat("es", {
    style: "currency",
    currency: artwork.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(artwork.price);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-bone/5">
        {artwork.image ? (
          <Image
            src={artwork.image}
            alt={`${artwork.title}, ${artwork.medium}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            style={{ background: artwork.gradient }}
          />
        )}
        {!artwork.available && (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs text-bone/80 backdrop-blur">
            Vendida
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl">{artwork.title}</h3>
        <span className="text-bone/70">{artwork.available ? price : ""}</span>
      </div>
      <p className="mt-1 text-sm text-bone/55">
        {artwork.medium}, {artwork.dimensions}, {artwork.year}
      </p>

      <div className="mt-5">
        {artwork.available ? (
          <BuyButton artworkId={artwork.id} />
        ) : (
          <a
            href="#contacto"
            className="text-sm text-bone/70 underline underline-offset-4 hover:text-bone"
          >
            Consultar obras similares
          </a>
        )}
      </div>
    </article>
  );
}
