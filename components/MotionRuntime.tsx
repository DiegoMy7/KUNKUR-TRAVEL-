"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function MotionRuntime() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.remove("reveal");
      });
      return;
    }

    document.documentElement.classList.add("motion-ready");

    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.86
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(".reveal");

      revealElements.forEach((element) => {
        const siblings = Array.from(element.parentElement?.children ?? []).filter((child) =>
          child.classList.contains("reveal")
        );
        const siblingIndex = Math.max(0, siblings.indexOf(element));
        const isFinalCta = element.classList.contains("cta-finale");
        const isCard =
          element.classList.contains("package-card") ||
          element.classList.contains("bento-card") ||
          element.classList.contains("testimonial-card");

        gsap.set(element, {
          autoAlpha: 0,
          y: isFinalCta ? 92 : isCard ? 68 : 56,
          scale: isCard ? 0.965 : 0.985,
          filter: "blur(12px)"
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(element, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: isFinalCta ? 1.18 : 0.98,
              delay: isCard ? Math.min(siblingIndex * 0.08, 0.32) : 0,
              ease: "expo.out",
              clearProps: "filter,transform,opacity,visibility",
              onComplete: () => element.classList.add("reveal-visible")
            });
          }
        });
      });

    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
      lenis.destroy();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
