import {
  ArrowRight,
  Bot,
  CalendarClock,
  CheckCircle2,
  CloudSun,
  Map,
  MessageSquareText,
  Shirt,
  Users,
  Wallet
} from "lucide-react";

const capabilities = [
  { label: "Destinos según presupuesto", icon: Wallet, href: "#kuntur-chat" },
  { label: "Rutas por días", icon: CalendarClock, href: "#paquetes" },
  { label: "Actividades y horarios", icon: Map, href: "#destinos" },
  { label: "Planes para pareja o familia", icon: Users, href: "#kuntur-chat" },
  { label: "Clima, ropa y transporte", icon: CloudSun, href: "#kuntur-chat" },
  { label: "Itinerarios para WhatsApp", icon: Shirt, href: "#kuntur-chat" }
];

const plannerSteps = [
  { label: "Presupuesto", value: "S/600" },
  { label: "Duración", value: "3 días" },
  { label: "Compañía", value: "Pareja" },
  { label: "Estilo", value: "Fotos" }
];

const routePlan = [
  "Paracas con salida temprano desde Lima.",
  "Islas Ballestas, reserva y traslado hacia Ica.",
  "Huacachina al atardecer y regreso sin correr."
];

export function AIPlannerSection() {
  return (
    <section id="planificador" className="section-pad-compact overflow-hidden bg-radial-ink">
      <div className="container-premium grid gap-8 lg:min-h-[680px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div className="reveal">
          <div className="eyebrow mb-4">Planificador de rutas</div>
          <h2 className="display-title text-[clamp(3rem,6vw,5.4rem)] leading-[0.94] text-bone text-balance">
            Un asesor que entiende cómo viajas.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-bone/72">
            Interpreta presupuesto, origen, duración, clima y compañía para convertir una idea suelta en
            una ruta clara, fotográfica y realista.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="reveal hover-lift relative flex min-h-[112px] flex-col justify-between rounded-[22px] border border-bone/12 bg-bone/7 p-4"
                  style={{ transitionDelay: `${index * 35}ms` }}
                >
                  <Icon className="text-sand" size={20} />
                  <p className="text-sm font-bold leading-5 text-bone/84">{item.label}</p>
                </a>
              );
            })}
          </div>
        </div>

        <div className="reveal relative self-center">
          <div className="absolute -left-8 top-10 hidden h-[72%] w-px bg-gradient-to-b from-transparent via-sand/35 to-transparent lg:block" />
          <div className="glass-panel planner-console relative overflow-hidden rounded-[32px] p-4 md:p-5">
            <div className="absolute -right-12 -top-12 size-52 rounded-full bg-sand/16 blur-3xl" />
            <div className="absolute bottom-10 left-8 h-20 w-20 rounded-full border border-sand/20 opacity-45" />

            <div className="relative rounded-[26px] border border-bone/14 bg-obsidian/78 p-4 md:p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-obsidian">
                    <Bot size={21} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-3xl font-semibold leading-none text-bone md:text-4xl">
                      Asistente Kuntur
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-bone/48">
                      ruta a medida
                    </p>
                  </div>
                </div>
                <MessageSquareText className="text-bone/35" size={22} />
              </div>

              <div className="grid gap-3 md:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[24px] border border-bone/10 bg-bone/7 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-sand">
                    lectura rápida
                  </p>
                  <div className="mt-4 grid gap-2">
                    {plannerSteps.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-full border border-bone/10 bg-obsidian/45 px-3 py-2"
                      >
                        <span className="text-xs font-bold text-bone/54">{item.label}</span>
                        <span className="text-sm font-extrabold text-bone">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#kuntur-chat"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sand px-4 py-3 text-sm font-extrabold text-obsidian transition hover:-translate-y-0.5 hover:bg-bone"
                  >
                    Diseñar ruta
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="rounded-[24px] border border-bone/10 bg-bone/9 p-4">
                  <p className="text-sm leading-6 text-bone/78">
                    Te conviene Paracas + Huacachina: costa, reserva natural, sunset en dunas y
                    presupuesto medido.
                  </p>
                  <div className="mt-4 space-y-3">
                    {routePlan.map((item, index) => (
                      <div key={item} className="planner-step flex gap-3 rounded-[18px] border border-bone/9 bg-obsidian/42 p-3">
                        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-sand/14 text-sand">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-6 text-bone/76">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Presupuesto claro", "Horarios realistas", "Clima revisado", "Listo para WhatsApp"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-sand/24 bg-sand/10 px-3 py-2 text-xs font-extrabold text-sand"
                  >
                    <CheckCircle2 size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
