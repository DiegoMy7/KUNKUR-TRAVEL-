"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { destinations } from "@/data/destinations";

export function DestinationSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated, setAnimated] = useState<number[]>([]);

  useEffect(() => {
    const timers = destinations.map((_, index) =>
      window.setTimeout(() => {
        setAnimated((current) => [...current, index]);
      }, 90 * index)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <div className="reveal mt-12">
      <div className="h-[430px] overflow-hidden rounded-[30px] border border-bone/12 bg-bone/5 max-lg:hidden lg:flex">
        {destinations.map((destination, index) => {
          const Icon = destination.icon;
          const active = activeIndex === index;
          return (
            <button
              key={destination.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className="group relative min-w-[54px] overflow-hidden border-r border-bone/10 text-left outline-none transition-[flex,opacity,transform] duration-700 ease-out last:border-r-0"
              style={{
                flex: active ? "7 1 0%" : "0.9 1 0%",
                opacity: animated.includes(index) ? 1 : 0,
                transform: animated.includes(index) ? "translateX(0)" : "translateX(-30px)"
              }}
              aria-label={`Ver ${destination.name}`}
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover transition duration-700"
                style={{
                  filter: active ? "saturate(1) brightness(.82)" : "saturate(.72) brightness(.48)",
                  transform: active ? "scale(1.04)" : "scale(1.1)"
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,5,.92),rgba(5,5,5,.2)_55%,rgba(5,5,5,.56))]" />
              <div className="absolute inset-x-0 bottom-0 z-10 h-36">
                <span
                  className="absolute bottom-8 grid size-12 place-items-center rounded-full border border-bone/18 bg-obsidian/78 text-sand shadow-[0_18px_40px_rgba(0,0,0,.45)] backdrop-blur transition-[left,transform,border-color,background] duration-700"
                  style={{
                    left: active ? "1.5rem" : "50%",
                    transform: active ? "translateX(0)" : "translateX(-50%)",
                    borderColor: active ? "rgba(216,168,91,.54)" : "rgba(245,240,232,.18)",
                    background: active ? "rgba(5,5,5,.86)" : "rgba(5,5,5,.72)"
                  }}
                >
                  <Icon size={20} />
                </span>
                <div
                  className="absolute bottom-8 left-24 min-w-[300px] transition duration-500"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateX(0)" : "translateX(22px)",
                    pointerEvents: active ? "auto" : "none"
                  }}
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sand">
                    {destination.category}
                  </p>
                  <h3 className="mt-1 font-display text-4xl font-semibold leading-none text-bone">
                    {destination.name}
                  </h3>
                  <p className="mt-3 text-sm font-bold text-bone/72">
                    {destination.duration} · {destination.budget}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2 lg:hidden">
        {destinations.map((destination, index) => {
          const Icon = destination.icon;
          return (
            <button
              key={destination.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative min-h-[360px] min-w-[82vw] snap-center overflow-hidden rounded-[26px] border border-bone/12 bg-bone/5 text-left sm:min-w-[48vw]"
            >
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 1px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,5,.94),rgba(5,5,5,.42)_55%,rgba(5,5,5,.16))]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="grid size-11 place-items-center rounded-full border border-bone/12 bg-obsidian/75 text-sand">
                  <Icon size={19} />
                </span>
                <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-sand">
                  {destination.category}
                </p>
                <h3 className="mt-2 font-display text-4xl font-semibold leading-none text-bone">
                  {destination.name}
                </h3>
                <p className="mt-4 text-sm font-bold text-bone/68">
                  {destination.duration} · {destination.budget}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
