import Image from "next/image";
import { Check, MoveRight } from "lucide-react";
import { packages } from "@/data/packages";

export function Packages() {
  return (
    <section id="paquetes" className="section-pad-compact bg-obsidian">
      <div className="container-premium">
        <div className="reveal mx-auto max-w-3xl text-center">
          <div className="eyebrow mb-5 justify-center">Paquetes</div>
          <h2 className="display-title text-[clamp(2.7rem,5.1vw,4.9rem)] text-bone">Precios claros. Rutas con carácter.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-bone/68">
            Pricing turístico pensado como experiencia: visual, flexible y listo para personalizar
            con el asistente.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-5">
          {packages.map((item) => (
            <article
              key={item.name}
              className="reveal hover-lift group relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[26px] border border-bone/12 bg-[#090908] md:min-h-[500px] xl:min-h-[520px]"
            >
              <div className="package-media relative h-[205px] shrink-0 overflow-hidden image-fallback md:h-[220px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 20vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.08]"
                />
                <span className="absolute left-4 top-4 z-10 rounded-full border border-bone/14 bg-obsidian/58 px-3 py-1 text-xs font-extrabold backdrop-blur">
                  {item.duration}
                </span>
              </div>
              <div className="relative z-10 flex flex-1 flex-col p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sand">{item.price}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-none">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-bone/58">Ideal para {item.idealFor}.</p>
                <div className="mt-4 space-y-2.5">
                  {item.includes.map((include) => (
                    <div key={include} className="flex gap-2 text-sm text-bone/72">
                      <Check className="mt-0.5 shrink-0 text-sand" size={16} />
                      {include}
                    </div>
                  ))}
                </div>
                <a href="#kuntur-chat" className="premium-button mt-5 w-full bg-bone/8">
                  Cotizar ruta
                  <MoveRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
