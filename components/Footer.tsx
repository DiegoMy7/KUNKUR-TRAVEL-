const footerLinks = [
  { label: "Experiencias", href: "#experiencias" },
  { label: "Destinos", href: "#destinos" },
  { label: "Planificador", href: "#planificador" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Testimonios", href: "#testimonios" }
];

const socials = ["Instagram", "TikTok", "WhatsApp"];

export function Footer() {
  return (
    <footer className="bg-obsidian py-12">
      <div className="container-premium">
        <div className="grid gap-8 border-t border-bone/12 pt-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold">Kuntur Travel</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-bone/56">
              Viajes locales por Perú, rutas personalizadas y paquetes flexibles para explorar mejor
              cada destino.
            </p>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sand">Mapa</p>
            <div className="mt-4 grid gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-bold text-bone/58 transition hover:text-bone"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sand">Redes</p>
            <div className="mt-4 grid gap-2">
              {socials.map((social) => (
                <a key={social} href="#" className="text-sm font-bold text-bone/58 transition hover:text-bone">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-bone/38">© 2026 Kuntur Travel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
