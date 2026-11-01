import Image from "next/image";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

interface AboutProps {
  /** Ruta de tu retrato en /public, ej: "/artista.jpg". Si falta, se muestra un degradado. */
  portrait?: string;
}

// Lo que una marca recibe al trabajar contigo. Deja solo lo que puedas cumplir.
const offers = [
  "Obra original hecha con cuidado, no una plantilla",
  "Contenido del proceso listo para tus canales",
  "Trato sereno, comunicación clara y fechas acordadas",
];

export default function About({ portrait }: AboutProps) {
  return (
    <section id="sobre-mi" className="border-t border-bone/10 py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-5">
        {/* Retrato */}
        <Reveal className="md:col-span-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-bone/5">
            {portrait ? (
              <Image
                src={portrait}
                alt={`Retrato de ${site.artist} en su estudio`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 55% at 35% 35%, #4f5bff, transparent 70%), radial-gradient(50% 50% at 70% 75%, #ff5a36, transparent 70%), #141416",
                }}
              />
            )}
          </div>
        </Reveal>

        {/* Texto */}
        <Reveal delay={120} className="md:col-span-3">
          <h2 className="font-serif text-4xl font-light leading-tight sm:text-6xl">
            Siluetas vivas en color vivo.
          </h2>

          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-bone/75">
            <p>
              Soy mcobromucho, artista visual de Xalapa, Veracruz. Pinto desde
              hace cuatro años y trabajo sobre todo con acrílico y grafito,
              las técnicas que mejor domino, a las que sumo la técnica mixta
              cuando la obra lo pide.
            </p>
            <p>
              Mi obra nace de la sensibilidad y la introspección. Pinto
              animales, personas y plantas como siluetas vivas, en colores
              intensos, para compartir un sentir estético: la vida tiene
              matices, y mirarlos con calma también es una experiencia.
            </p>
            <p>
              Estoy en una etapa de expansión. Busco marcas, patrocinadores y
              espacios donde exponer, para construir proyectos desde el
              principio y llevar la obra de mcobromucho a otros lugares.
            </p>
          </div>

          <h3 className="mt-12 font-serif text-2xl">Qué recibe tu marca</h3>
          <ul className="mt-5 max-w-xl space-y-3 text-bone/80">
            {offers.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-ultra"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-ultra px-7 py-3 text-sm font-medium text-bone transition hover:brightness-110"
            >
              Proponer una alianza
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-bone/30 px-7 py-3 text-sm font-medium transition hover:border-bone hover:bg-bone/5"
            >
              Ver el proceso en Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}