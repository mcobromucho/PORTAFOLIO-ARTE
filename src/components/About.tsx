import Reveal from "@/components/Reveal";
import PhotoStack, { type Photo } from "@/components/PhotoStack";
import { site } from "@/lib/site";

// Fotos de la galería. La primera es el autorretrato que ya está en tu proyecto.
// Para agregar más: sube la foto a la carpeta /public y añade una línea aquí,
// con el mismo formato, antes del corchete de cierre ].
const photos: Photo[] = [
  {
    src: "/obras/obra-06.png",
    alt: "Autorretrato Xalapa, acrílico y técnica mixta sobre lienzo",
  },
  {
    src: "/yo-02.jpg",
    alt: "Retrato del artista con chamarra de mezclilla",
  },
  // { src: "/yo-03.jpg", alt: "Descripción de la foto" },
];

// Lo que una marca recibe al trabajar contigo. Deja solo lo que puedas cumplir.
const offers = [
  "Obra original hecha con cuidado, no una plantilla",
  "Contenido del proceso listo para tus canales",
  "Trato sereno, comunicación clara y fechas acordadas",
];

export default function About() {
  return (
    <section id="sobre-mi" className="border-t border-bone/10 py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-5">
        {/* Fotos */}
        <Reveal className="md:col-span-2">
          <PhotoStack photos={photos} />
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
