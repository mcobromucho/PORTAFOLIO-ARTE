import Reveal from "@/components/Reveal";
import SponsorForm from "@/components/SponsorForm";

// Rellena cada paquete con tus condiciones reales antes de publicar.
const packages = [
  {
    name: "Mecenas",
    description:
      "Financias la producción de una serie completa de obras.",
    perks: [
      "Tu nombre en la serie y en la exposición",
      "Contenido del proceso creativo para tu comunicación",
      "Una obra de edición limitada",
    ],
    featured: false,
  },
  {
    name: "Colaboración de marca",
    description:
      "Creo una obra o intervención junto a tu producto, con una historia real detrás.",
    perks: [
      "Obra creada con tu marca como protagonista",
      "Publicaciones y vídeo en mis redes",
      "Derechos de uso acordados por escrito",
    ],
    featured: true,
  },
  {
    name: "Encargo y espacio",
    description:
      "Una obra a medida para tu oficina, tienda, hotel o evento.",
    perks: [
      "Propuesta visual antes de empezar",
      "Medidas y paleta adaptadas al espacio",
      "Instalación y certificado incluidos",
    ],
    featured: false,
  },
];

export default function Sponsors() {
  return (
    <section id="alianzas" className="border-t border-bone/10 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-4xl font-light sm:text-6xl">
            Tu marca, junto a obra que la gente recuerda.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/70">
            Colaboro con marcas que comparten una visión estética. Tu producto o
            tu espacio se convierte en parte del proceso creativo y llega a mi
            comunidad con una historia real, no con un anuncio.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 120}>
              <div
                className={`h-full rounded-2xl border p-8 ${
                  pkg.featured
                    ? "border-ultra bg-ultra/5"
                    : "border-bone/10"
                }`}
              >
                <h3 className="font-serif text-3xl">{pkg.name}</h3>
                <p className="mt-3 text-bone/70">{pkg.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-bone/80">
                  {pkg.perks.map((perk) => (
                    <li key={perk} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-ultra"
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Formulario de marcas: es el objetivo principal de negocio */}
        <Reveal className="mt-24">
          <div
            id="contacto"
            className="mx-auto max-w-2xl scroll-mt-28 rounded-3xl border border-bone/10 bg-bone/[0.03] p-8 sm:p-12"
          >
            <h3 className="font-serif text-3xl sm:text-4xl">
              Hablemos de tu marca
            </h3>
            <p className="mt-3 text-bone/70">
              Cuéntame qué buscas. Respondo en un máximo de 48 horas.
            </p>
            <SponsorForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
