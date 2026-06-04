import { DestinationSelector } from "@/components/DestinationSelector";

export function DestinationGrid() {
  return (
    <section id="destinos" className="section-pad bg-obsidian">
      <div className="container-premium">
        <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-5">Destinos destacados</div>
            <h2 className="display-title max-w-3xl text-[clamp(3.3rem,8vw,7rem)] text-bone">
              Rutas locales con alma cinematográfica.
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-bone/68">
            Cada destino combina datos prácticos, sensibilidad local y una capa visual pensada para
            convertir el viaje en una historia.
          </p>
        </div>

        <DestinationSelector />
      </div>
    </section>
  );
}
