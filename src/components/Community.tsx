import Reveal from "@/components/Reveal";
import Newsletter from "@/components/Newsletter";
import { site } from "@/lib/site";

export default function Community() {
  return (
    <section id="comunidad" className="border-t border-bone/10 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-serif text-4xl font-light sm:text-6xl">
            Entra al estudio.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/70">
            Una carta al mes con obras nuevas antes que nadie, el proceso detrás
            de cada pieza y un 10 % de descuento en tu primera compra.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-bone/10 p-8">
              <h3 className="font-serif text-3xl">Sigue el proceso</h3>
              <p className="mt-3 text-bone/70">
                Bocetos, errores y obras terminadas, tal como pasan en el estudio.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition hover:bg-white"
                >
                  Seguir en Instagram
                </a>
                <a
                  href={site.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-bone/30 px-6 py-3 text-sm font-medium transition hover:border-bone"
                >
                  Seguir en TikTok
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-2xl border border-ultra bg-ultra/5 p-8">
              <h3 className="font-serif text-3xl">Carta del estudio</h3>
              <p className="mt-3 text-bone/70">
                Gratis. Te escribo una vez al mes y puedes salir cuando quieras.
              </p>
              <Newsletter />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
