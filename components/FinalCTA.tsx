import Image from "next/image";
import { Bot, MapPinned } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-obsidian py-24 md:py-36">
      <div className="absolute inset-0 image-fallback">
        <Image
          src="https://images.pexels.com/photos/16820322/pexels-photo-16820322.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="Paisaje peruano para cierre de landing"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,.9),rgba(5,5,5,.54)),linear-gradient(0deg,#050505,rgba(5,5,5,.08),#050505)]" />
      </div>

      <div className="container-premium relative z-10">
        <div className="reveal max-w-4xl">
          <div className="eyebrow mb-5">CTA final</div>
          <h2 className="display-title text-[clamp(3.6rem,9vw,8.4rem)] text-bone text-balance">
            Tu próximo viaje ya existe. Solo falta diseñarlo.
          </h2>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#kuntur-chat" className="premium-button premium-button-primary">
              <Bot size={17} />
              Hablar con el asistente
            </a>
            <a href="#destinos" className="premium-button bg-bone/8">
              <MapPinned size={17} />
              Ver destinos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
