"use client";

import Image from "next/image";
import { Menu, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Experiencias", href: "#experiencias" },
  { label: "Destinos", href: "#destinos" },
  { label: "Planificador", href: "#planificador" },
  { label: "Paquetes", href: "#paquetes" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const lightSection = document.querySelector<HTMLElement>("[data-nav-theme='light']");
      if (!lightSection) {
        setLightMode(false);
        return;
      }

      const rect = lightSection.getBoundingClientRect();
      setLightMode(rect.top <= 82 && rect.bottom >= 82);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-40 w-full transition-all duration-300",
        scrolled && lightMode
          ? "bg-bone/88 py-2 text-obsidian shadow-[0_12px_48px_rgba(5,5,5,.12)] backdrop-blur-2xl"
          : scrolled
            ? "bg-obsidian/64 py-2 text-bone shadow-glass backdrop-blur-2xl"
            : "bg-transparent py-5 text-bone"
      )}
    >
      <nav className="container-premium flex items-center justify-between gap-4">
        <a
          href="#inicio"
          className={cn("group flex items-center gap-3 transition-all duration-300", scrolled ? "min-w-[220px]" : "min-w-[260px]")}
          aria-label="Kuntur Travel"
          onClick={() => setOpen(false)}
        >
          <span
            className={cn(
              "relative grid shrink-0 place-items-center rounded-full border border-sand/45 bg-[#07111d] shadow-[0_14px_40px_rgba(0,0,0,.36)] transition-all duration-300 group-hover:scale-105 group-hover:border-sand",
              scrolled ? "size-11" : "size-14"
            )}
          >
            <Image
              src="/logo-kuntur-clean.png"
              alt=""
              width={48}
              height={48}
              className={cn("object-contain transition-all duration-300", scrolled ? "size-9" : "size-12")}
              priority
            />
          </span>
          <span className="min-w-0">
            <span className={cn("block truncate font-display font-semibold leading-none tracking-normal transition-all duration-300", scrolled ? "text-xl 2xl:text-2xl" : "text-2xl 2xl:text-3xl")}>
              Kuntur Travel
            </span>
            <span
              className={cn(
                "hidden overflow-hidden text-[0.62rem] font-extrabold uppercase tracking-[0.28em] transition-all duration-300 sm:block",
                scrolled ? "mt-0 max-h-0 opacity-0" : "mt-1 max-h-4 opacity-100",
                lightMode && scrolled ? "text-obsidian/45" : "text-sand/70"
              )}
            >
              rutas locales
            </span>
          </span>
        </a>

        <div
          className={cn(
            "hidden items-center gap-1 rounded-full border px-2 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl transition-all duration-300 lg:flex",
            scrolled ? "py-1.5" : "py-2",
            lightMode && scrolled
              ? "border-obsidian/10 bg-obsidian/[0.04]"
              : "border-bone/12 bg-bone/[0.075]"
          )}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-full px-3 text-sm font-extrabold transition duration-300 2xl:px-4",
                scrolled ? "py-1.5" : "py-2",
                lightMode && scrolled
                  ? "text-obsidian/62 hover:bg-obsidian/7 hover:text-obsidian"
                  : "text-bone/68 hover:bg-bone/10 hover:text-bone"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <span
            className={cn(
              "hidden rounded-full border px-3 py-2 text-xs font-extrabold uppercase tracking-[0.18em] 2xl:inline-flex",
              lightMode && scrolled
                ? "border-obsidian/10 bg-obsidian/[0.04] text-obsidian/52"
                : "border-sand/18 bg-sand/10 text-sand/72"
            )}
          >
            IA travel
          </span>
          <a href="#kuntur-chat" className="premium-button premium-button-primary nav-cta">
            <Send size={16} />
            Diseñar mi viaje
          </a>
        </div>

        <button
          className={cn(
            "grid size-11 place-items-center rounded-full border lg:hidden",
            lightMode && scrolled ? "border-obsidian/12 bg-obsidian/5" : "border-bone/15 bg-bone/10"
          )}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      {open ? (
        <div id="mobile-navigation" className="container-premium mt-4 rounded-[22px] border border-bone/12 bg-obsidian/94 p-4 shadow-glass backdrop-blur-2xl lg:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-bone/76 hover:bg-bone/10"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kuntur-chat"
              className="premium-button premium-button-primary mt-2"
              onClick={() => setOpen(false)}
            >
              <Send size={16} />
              Diseñar mi viaje
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
