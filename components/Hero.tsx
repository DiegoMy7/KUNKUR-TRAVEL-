"use client";

import Image from "next/image";
import { ArrowDown, Bot, CalendarDays, MapPinned, Plane, Sparkles, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "+32 destinos locales", icon: MapPinned, href: "#destinos" },
  { label: "Planificador inteligente", icon: Bot, href: "#kuntur-chat" },
  { label: "Rutas de 1 a 7 días", icon: CalendarDays, href: "#paquetes" },
  { label: "Presupuesto inteligente", icon: Wallet, href: "#kuntur-chat" }
];

const rotatingDestinations = ["Lima", "Ica", "Cusco", "Arequipa", "Huaraz", "Tarapoto", "Paracas"];

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [destinationIndex, setDestinationIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDestinationIndex((current) => (current + 1) % rotatingDestinations.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-kicker", { opacity: 0, y: 18, duration: 0.7 })
        .from(".hero-title-word", { opacity: 0, y: 76, rotateX: -28, stagger: 0.08, duration: 1.05 }, "-=0.34")
        .from(".hero-copy", { opacity: 0, y: 22, duration: 0.8 }, "-=0.68")
        .from(".hero-actions", { opacity: 0, y: 18, duration: 0.75 }, "-=0.52")
        .from(".hero-pill", { opacity: 0, y: 14, stagger: 0.08, duration: 0.55 }, "-=0.42")
        .from(".hero-route-dot", { opacity: 0, scale: 0, stagger: 0.14, duration: 0.55 }, "-=0.65")
        .from(panelRef.current, { opacity: 0, y: 34, scale: 0.96, duration: 0.9 }, "-=0.78");

      gsap.to(".hero-route-dot", {
        y: -8,
        duration: 2.2,
        stagger: 0.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(imageRef.current, {
        yPercent: 9,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(panelRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="inicio" ref={rootRef} className="relative grid min-h-[100svh] overflow-hidden pb-10 pt-24 md:pb-14 md:pt-28">
      <div ref={imageRef} className="absolute inset-0 -z-10 scale-105 image-fallback">
        <Image
          src="https://images.pexels.com/photos/16820322/pexels-photo-16820322.jpeg?auto=compress&cs=tinysrgb&w=2200"
          alt="Costa peruana con luz cinematográfica"
          fill
          priority
          sizes="100vw"
          className="hero-bg-media object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.88),rgba(5,5,5,.58)_42%,rgba(5,5,5,.18)),linear-gradient(0deg,#050505_0%,rgba(5,5,5,.04)_46%,rgba(5,5,5,.52)_100%)]" />
        <div className="hero-route-dot absolute left-[58%] top-[26%] size-3 rounded-full bg-sand shadow-[0_0_28px_rgba(216,168,91,.85)]" />
        <div className="hero-route-dot absolute left-[70%] top-[44%] size-2.5 rounded-full bg-bone shadow-[0_0_24px_rgba(245,240,232,.7)]" />
        <div className="hero-route-dot absolute left-[82%] top-[33%] size-3 rounded-full bg-sand shadow-[0_0_28px_rgba(216,168,91,.85)]" />
      </div>

      <div className="container-premium grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-3xl pt-3 md:pt-8">
          <div className="hero-kicker eyebrow mb-4 md:mb-5">Viajes locales por Perú, diseñados a tu medida</div>
          <h1 className="hero-title display-title max-w-4xl text-[clamp(3rem,11vw,7.4rem)] leading-[0.9] text-bone text-balance [text-shadow:0_18px_60px_rgba(0,0,0,.78)] md:leading-[0.92]">
            <span className="hero-title-word">Diseña</span>{" "}
            <span className="hero-title-word">tu</span>{" "}
            <span className="hero-title-word">próxima</span>{" "}
            <span className="hero-title-word">ruta</span>{" "}
            <span className="hero-title-word">por</span>{" "}
            <span className="hero-destination-shell">
              <span key={rotatingDestinations[destinationIndex]} className="hero-destination-word">
                {rotatingDestinations[destinationIndex]}
              </span>
            </span>
          </h1>
          <p className="hero-copy mt-5 max-w-xl text-base leading-7 text-bone/78 md:mt-6 md:text-lg md:leading-8">
            Escapadas locales, paquetes flexibles y recomendaciones personalizadas para viajar con
            presupuesto claro, mejores horarios y menos improvisación.
          </p>
          <div className="hero-actions mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
            <a href="#planificador" className="premium-button premium-button-primary">
              <Sparkles size={17} />
              Crear mi ruta
            </a>
            <a href="#destinos" className="premium-button bg-bone/8">
              Ver experiencias
              <ArrowDown size={16} />
            </a>
          </div>
          <div className="mt-5 grid max-w-xl grid-cols-3 gap-3 md:mt-8">
            {["Costa", "Andes", "Selva"].map((place) => (
              <span
                key={place}
                className="hero-pill rounded-full border border-bone/12 bg-bone/8 px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-bone/70 backdrop-blur"
              >
                {place}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={panelRef}
          className="glass-panel relative ml-auto w-full max-w-[520px] overflow-hidden rounded-[26px] p-4 md:rounded-[30px] md:p-5"
        >
          <div className="relative mb-4 h-48 overflow-hidden rounded-[22px] image-fallback sm:h-56 md:h-72 md:rounded-[24px]">
            <Image
              src="https://images.pexels.com/photos/3521062/pexels-photo-3521062.jpeg?auto=compress&cs=tinysrgb&w=1100"
              alt="Machu Picchu como destino recomendado"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/88 via-obsidian/18 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sand">Ruta destacada</p>
                <h2 className="mt-1 font-display text-4xl font-semibold leading-none">Cusco Místico</h2>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-obsidian">
                <Plane size={19} />
              </span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-sand">Planificador</p>
              <h2 className="mt-1 font-display text-3xl font-semibold">Ruta inteligente</h2>
            </div>
            <span className="rounded-full border border-andean/50 bg-andean/25 px-3 py-1 text-xs font-extrabold text-bone">
              Online
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl border border-bone/12 bg-obsidian/42 p-4 transition duration-300 hover:-translate-y-1 hover:border-sand/35 hover:bg-bone/10"
                >
                  <Icon className="mb-3 text-sand" size={19} />
                  <p className="text-sm font-extrabold leading-5 text-bone/88">{item.label}</p>
                </a>
              );
            })}
          </div>

          <div className="mt-4 rounded-3xl border border-sand/25 bg-sand/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sand/90">Sugerencia</p>
            <p className="mt-2 text-sm leading-6 text-bone/76">
              Para S/600 y 3 días desde Lima: Paracas + Huacachina con sunset, reserva y noche
              fotográfica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
