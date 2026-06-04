import { Brain, Camera, CloudSun, HeartHandshake, MessageCircle, Route } from "lucide-react";

const features = [
  {
    title: "Un asistente que entiende tu presupuesto",
    text: "No solo filtra precios: decide dónde conviene ahorrar y dónde vale invertir.",
    icon: Brain,
    className: "lg:col-span-2",
    href: "#kuntur-chat"
  },
  {
    title: "Rutas locales verificadas",
    text: "Planifica con tiempos realistas, traslados posibles y margen para respirar.",
    icon: Route,
    className: "",
    href: "#destinos"
  },
  {
    title: "Experiencias fotogénicas",
    text: "Miradores, golden hour, spots de comida y paisajes con buen recorte visual.",
    icon: Camera,
    className: "",
    href: "#destinos"
  },
  {
    title: "Planes para tu tipo de viaje",
    text: "Pareja, amigos, familia o viaje solo: el ritmo cambia con la compañía.",
    icon: HeartHandshake,
    className: "lg:col-span-2",
    href: "#kuntur-chat"
  },
  {
    title: "Clima y temporada",
    text: "Consejos de ropa, horarios y planes alternos cuando la ruta pide flexibilidad.",
    icon: CloudSun,
    className: "",
    href: "#kuntur-chat"
  },
  {
    title: "Listo para WhatsApp",
    text: "Itinerarios resumidos para compartir, aprobar y ajustar sin fricción.",
    icon: MessageCircle,
    className: "lg:col-span-2",
    href: "#kuntur-chat"
  }
];

export function BentoFeatures() {
  return (
    <section className="section-pad bg-[linear-gradient(180deg,#050505,#0b1e2d_48%,#050505)]">
      <div className="container-premium">
        <div className="reveal max-w-3xl">
          <div className="eyebrow mb-5">Ventajas</div>
          <h2 className="display-title text-[clamp(3.2rem,8vw,7rem)] text-bone">
            La lógica del viaje, diseñada como interfaz.
          </h2>
        </div>
        <div className="mt-12 grid auto-rows-[minmax(230px,auto)] gap-4 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <a
                key={feature.title}
                href={feature.href}
                className={`reveal group relative overflow-hidden rounded-[28px] border border-bone/12 bg-bone/6 p-6 ${feature.className}`}
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(216,168,91,.22),transparent_36%)]" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <Icon className="text-sand" size={27} />
                  <div>
                    <h3 className="font-display text-4xl font-semibold leading-none">{feature.title}</h3>
                    <p className="mt-4 max-w-md text-sm leading-6 text-bone/66">{feature.text}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
