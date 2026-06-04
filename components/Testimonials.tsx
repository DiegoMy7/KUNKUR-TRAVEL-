import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Valeria y Martín",
    route: "Paracas Sunset",
    text: "Teníamos poco presupuesto y cero ganas de improvisar. La ruta salió con horarios perfectos, buen hotel y fotos al atardecer."
  },
  {
    name: "Diego, Renzo y Abril",
    route: "Huaraz Aventura",
    text: "Nos ordenó la aclimatación y evitó que metiéramos demasiadas lagunas en un día. Se sintió como un amigo que sí sabe planear."
  },
  {
    name: "Familia Cabrera",
    route: "Cusco Místico",
    text: "Nos dio un plan tranquilo para viajar con mis papás, sin perder Valle Sagrado ni Machu Picchu. Todo fácil de compartir."
  }
];

export function Testimonials() {
  return (
    <section id="testimonios" data-nav-theme="light" className="section-pad bg-bone text-obsidian">
      <div className="container-premium">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-5 text-obsidian/70">Testimonios</div>
            <h2 className="display-title max-w-3xl text-[clamp(3rem,6.5vw,5.9rem)]">
              Viajeros con planes más claros.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-obsidian/62">
            Rutas pensadas para evitar improvisaciones, ordenar horarios y llegar a cada destino con
            margen.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="reveal hover-lift relative rounded-[26px] border border-obsidian/12 bg-obsidian/[0.04] p-6"
            >
              <Quote className="text-clay" size={28} />
              <p className="mt-8 text-lg leading-8 text-obsidian/72">{item.text}</p>
              <div className="mt-8 border-t border-obsidian/12 pt-5">
                <h3 className="font-display text-3xl font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm font-extrabold uppercase tracking-[0.16em] text-clay">
                  {item.route}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
