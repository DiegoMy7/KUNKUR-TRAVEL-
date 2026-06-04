import Image from "next/image";

export function StorySection() {
  return (
    <section className="section-pad relative overflow-hidden bg-obsidian">
      <div className="container-premium grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="reveal relative min-h-[620px]">
          <div className="hover-lift absolute left-0 top-4 h-[430px] w-[76%] overflow-hidden rounded-[34px] border border-bone/12 image-fallback">
            <Image
              src="https://images.pexels.com/photos/26984841/pexels-photo-26984841.jpeg?auto=compress&cs=tinysrgb&w=1300"
              alt="Paisaje andino durante un viaje"
              fill
              sizes="(max-width: 1024px) 80vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
          </div>
          <div className="hover-lift absolute bottom-6 right-0 h-[330px] w-[58%] overflow-hidden rounded-[30px] border border-sand/30 image-fallback shadow-glow">
            <Image
              src="https://images.pexels.com/photos/35923673/pexels-photo-35923673.jpeg?auto=compress&cs=tinysrgb&w=1100"
              alt="Viajeros contemplando una ruta"
              fill
              sizes="(max-width: 1024px) 58vw, 34vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/82 to-transparent" />
          </div>
          <div className="absolute left-8 top-[410px] rounded-full border border-bone/12 bg-bone/10 px-5 py-3 text-sm font-extrabold text-bone/72 backdrop-blur">
            memoria / ruta / clima / presupuesto
          </div>
        </div>

        <div className="reveal">
          <div className="eyebrow mb-5">Storytelling</div>
          <h2 className="display-title text-[clamp(3.1rem,6.6vw,6rem)] text-bone text-balance">
            No vendemos viajes. Diseñamos memorias.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-bone/70">
            <p>
              Una ruta buena no empieza en un mapa. Empieza con una pregunta más honesta: ¿qué tipo de
              recuerdo quieres traer de vuelta?
            </p>
            <p>
              Kuntur Travel mezcla criterio local, datos de temporada y una estética de exploración
              para proponer experiencias que se sienten personales sin perder realismo.
            </p>
            <p>
              La tecnología desaparece cuando el viaje está bien diseñado: queda el amanecer, el plato
              correcto, el traslado sin estrés y esa foto que parece accidental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
