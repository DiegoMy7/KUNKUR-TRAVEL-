"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyFrames } from "@/data/journey";

gsap.registerPlugin(ScrollTrigger);

export function ScrollJourneySequence() {
  const rootRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const sticky = stickyRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!root || !sticky || reduced) return;

    const ctx = gsap.context(() => {
      const images = gsap.utils.toArray<HTMLElement>(".journey-image");
      const texts = gsap.utils.toArray<HTMLElement>(".journey-copy");
      const indicators = gsap.utils.toArray<HTMLElement>(".journey-indicator");

      gsap.set(images.slice(1), { autoAlpha: 0, scale: 1.04 });
      gsap.set(texts.slice(1), { autoAlpha: 0, y: 24 });
      gsap.set(indicators.slice(1), { opacity: 0.28 });

      const scrollDistance = window.innerWidth < 768 ? 420 : 640;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: `+=${journeyFrames.length * scrollDistance}`,
          scrub: 0.9,
          pin: sticky,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      journeyFrames.slice(1).forEach((_, index) => {
        const current = index;
        const next = index + 1;
        tl.to(images[current], { autoAlpha: 0, scale: 1.08, duration: 0.8, ease: "none" })
          .to(images[next], { autoAlpha: 1, scale: 1, duration: 0.8, ease: "none" }, "<")
          .to(texts[current], { autoAlpha: 0, y: -18, duration: 0.22, ease: "power2.out" }, "<")
          .to(texts[next], { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" }, ">-=0.02")
          .to(indicators[current], { opacity: 0.28, width: "2.25rem", duration: 0.24 }, "<")
          .to(indicators[next], { opacity: 1, width: "4.75rem", duration: 0.24 }, "<");
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencias" ref={rootRef} className="relative bg-obsidian">
      <div ref={stickyRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 image-fallback">
          {journeyFrames.map((frame, index) => (
            <div key={frame.title} className="journey-image absolute inset-0">
              <Image
                src={frame.image}
                alt={frame.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.92),rgba(5,5,5,.36)_48%,rgba(5,5,5,.8)),linear-gradient(0deg,#050505_0%,transparent_30%,rgba(5,5,5,.55)_100%)]" />
        </div>

        <div className="container-premium relative z-10 flex h-full items-center">
          <div className="relative min-h-[390px] max-w-[560px] rounded-[28px] border border-bone/10 bg-obsidian/42 p-5 pb-14 backdrop-blur-[2px] md:min-h-[500px] md:rounded-[30px] md:p-7 md:pb-16">
            <div className="eyebrow mb-5">Secuencia de viaje</div>
            <div className="relative min-h-[250px] md:min-h-[330px]">
              {journeyFrames.map((frame, index) => (
                <article key={frame.title} className="journey-copy absolute inset-x-0 top-0">
                  <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.24em] text-sand md:text-sm">
                    Frame {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="display-title max-w-full text-[clamp(2.7rem,4.65vw,4.35rem)] leading-[0.96] text-bone text-balance">
                    {frame.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-bone/72 md:text-base md:leading-7">{frame.caption}</p>
                </article>
              ))}
            </div>
            <div className="absolute bottom-6 left-5 right-5 flex items-center gap-2 md:left-7 md:right-7">
              {journeyFrames.map((frame, index) => (
                <span
                  key={frame.title}
                  className="journey-indicator h-1 w-9 rounded-full bg-bone first:w-20 first:bg-sand"
                  style={{ opacity: index === 0 ? 1 : 0.28 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
