"use client";

import Image from "next/image";
import {
  Bot,
  CheckCircle2,
  MessageCircle,
  Minimize2,
  RotateCcw,
  Send,
  Sparkles,
  X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Section = {
  label: string;
  value: string;
};

const quickPrompts = [
  {
    label: "Pareja 3 días",
    prompt: "Tengo S/700, salgo desde Lima y quiero un viaje romántico de 3 días."
  },
  {
    label: "Full day",
    prompt: "Quiero un full day desde Lima con bajo presupuesto y buenas fotos."
  },
  {
    label: "Aventura",
    prompt: "Somos amigos, queremos aventura, montaña y un presupuesto medio."
  },
  {
    label: "Clima y ropa",
    prompt: "Voy a Cusco, dime clima, ropa y recomendaciones para no improvisar."
  }
];

const welcome =
  "Hola, soy el Asistente Kuntur. Cuéntame presupuesto, ciudad de origen, días, compañía y estilo de viaje. Te devuelvo una ruta clara, presupuesto aproximado y tips listos para presentar.";

const whatsappNumber = "51965338001";

function buildWhatsAppLink(content: string) {
  const text = `Hola, quiero consultar esta ruta de Kuntur Travel:\n\n${content}`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function parseSections(content: string): Section[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([^:]{3,34}):\s*(.+)$/);
      if (!match) return null;
      return { label: match[1], value: match[2] };
    })
    .filter((section): section is Section => Boolean(section));
}

function AssistantBubble({ content }: { content: string }) {
  const sections = useMemo(() => parseSections(content), [content]);

  if (sections.length < 3) {
    return (
      <div className="chat-message max-w-[88%] rounded-[22px] border border-bone/12 bg-bone/[0.105] px-4 py-3 text-sm leading-6 text-bone/90">
        {content}
      </div>
    );
  }

  return (
    <div className="chat-message max-w-[88%] rounded-[22px] border border-bone/12 bg-bone/[0.105] px-4 py-3 text-sm leading-6 text-bone/90 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-sand/80">
              {section.label}
            </p>
            <p className="mt-1 text-sm leading-6 text-bone/88">{section.value}</p>
          </div>
        ))}
      </div>
      <a
        href={buildWhatsAppLink(content)}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sand px-4 py-2.5 text-sm font-extrabold text-obsidian transition hover:bg-bone"
      >
        Enviar plan por WhatsApp
        <Send size={16} />
      </a>
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [closingMode, setClosingMode] = useState<"minimize" | "close" | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: welcome }
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#kuntur-chat") {
        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
        setClosingMode(null);
        setOpen(true);
        setMinimized(false);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const resetChat = () => {
    setMessages([{ id: "welcome", role: "assistant", content: welcome }]);
    setInput("");
  };

  const closeChat = () => {
    if (closingMode) return;
    setClosingMode("close");
    transitionTimerRef.current = setTimeout(() => {
      resetChat();
      setOpen(false);
      setMinimized(false);
      setClosingMode(null);
    }, 230);
  };

  const minimizeChat = () => {
    if (closingMode) return;
    setClosingMode("minimize");
    transitionTimerRef.current = setTimeout(() => {
      setOpen(false);
      setMinimized(true);
      setClosingMode(null);
    }, 230);
  };

  const restoreChat = () => {
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    setClosingMode(null);
    setMinimized(false);
    setOpen(true);
  };

  const sendMessage = async (text: string) => {
    const clean = text.trim();
    if (!clean || loading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: clean };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: clean,
          messages: messages
            .filter((message) => message.id !== "welcome")
            .slice(-6)
            .map((message) => ({ role: message.role, content: message.content }))
        })
      });
      const data = (await response.json()) as { reply?: string };
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply ?? "Destino recomendado: Paracas + Huacachina\nPor qué encaja: ruta visual, cercana y fácil de presentar.\nDuración ideal: 3 días.\nPresupuesto aproximado: S/520 a S/720 por persona.\nCTA final: dime fecha y número de viajeros para cerrar el plan."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Destino recomendado: Cusco Místico\nPor qué encaja: combina cultura, fotos y una ruta fácil de explicar.\nDuración ideal: 4 a 5 días.\nPresupuesto aproximado: S/890 a S/1,480 por persona sin vuelos.\nCTA final: dime presupuesto, días y compañía para ajustar la ruta."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <div id="kuntur-chat" className="chat-root fixed bottom-5 right-4 z-50 sm:bottom-7 sm:right-7">
      {open ? (
        <section
          data-lenis-prevent
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
          className={`chat-panel chat-shell mb-4 flex h-[min(640px,calc(100svh-112px))] min-h-[510px] w-[calc(100vw-32px)] max-w-[440px] flex-col overflow-hidden overscroll-contain rounded-[30px] border border-bone/18 shadow-[0_30px_120px_rgba(0,0,0,.72)] ${closingMode ? "chat-panel-out" : ""}`}
        >
          <div className="relative overflow-hidden border-b border-bone/10 px-4 py-3.5">
            <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-sand/18 blur-3xl" />
            <div className="pointer-events-none absolute left-12 top-0 h-px w-64 bg-gradient-to-r from-transparent via-sand/60 to-transparent" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-sand/45 bg-[#07111d]">
                  <Image
                    src="/logo-kuntur-clean.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 object-contain"
                  />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl font-semibold leading-none text-bone">
                      Asistente Kuntur
                    </h2>
                    <span className="rounded-full border border-andean/50 bg-andean/25 px-2.5 py-1 text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-bone/82">
                      online
                    </span>
                  </div>
                  <p className="mt-1 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-sand/72">
                    copiloto de rutas por Perú
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={minimizeChat}
                  className="grid size-9 place-items-center rounded-full border border-bone/12 bg-bone/8 text-bone/72 transition hover:bg-bone/14 hover:text-bone"
                  aria-label="Minimizar chat"
                  title="Minimizar"
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  onClick={resetChat}
                  className="grid size-9 place-items-center rounded-full border border-bone/12 bg-bone/8 text-bone/72 transition hover:bg-bone/14 hover:text-bone"
                  aria-label="Reiniciar conversación"
                  title="Reiniciar"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={closeChat}
                  className="grid size-9 place-items-center rounded-full border border-bone/12 bg-bone/8 transition hover:bg-bone/14"
                  aria-label="Cerrar y limpiar chat"
                  title="Cerrar y limpiar"
                >
                  <X size={17} />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={listRef}
            data-lenis-prevent
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            className="chat-scroll flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
          >
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="chat-message ml-auto max-w-[76%] rounded-[20px] bg-bone px-4 py-2.5 text-sm font-bold leading-6 text-obsidian shadow-[0_12px_36px_rgba(0,0,0,.24)]">
                  {message.content}
                </div>
              ) : (
                <div key={message.id} className="flex gap-3">
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full bg-sand text-obsidian">
                    <Bot size={17} />
                  </span>
                  <AssistantBubble content={message.content} />
                </div>
              )
            )}
            {loading ? (
              <div className="chat-typing flex max-w-[88%] items-center gap-3 rounded-[22px] border border-sand/20 bg-bone/[0.085] px-4 py-3 text-sm text-bone/74 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sand/16 text-sand">
                  <Sparkles size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-sand/78">
                    Asistente pensando
                  </span>
                  <span className="mt-1 flex items-center gap-1 text-bone/62">
                    Afinando ruta
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </span>
                </span>
              </div>
            ) : null}
          </div>

          <div className="border-t border-bone/10 bg-obsidian/32 p-4">
            <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => void sendMessage(prompt.prompt)}
                  className="shrink-0 rounded-full border border-sand/25 bg-sand/10 px-3.5 py-2 text-xs font-extrabold text-sand transition hover:bg-sand/18"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex items-center gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-bone/12 bg-obsidian/70 px-4 py-2.5 transition focus-within:border-sand/60">
                <CheckCircle2 className="shrink-0 text-sand/70" size={17} />
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ej: S/700, 3 días, pareja, desde Lima..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-bone outline-none placeholder:text-bone/35"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-obsidian shadow-glow transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-45"
                aria-label="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </section>
      ) : null}

      {!open && minimized ? (
        <button
          onClick={restoreChat}
          className="chat-minimized group"
          aria-label="Restaurar Asistente Kuntur"
        >
          <Image
            src="/logo-kuntur-clean.png"
            alt=""
            width={34}
            height={34}
            className="size-9 object-contain"
          />
          <span className="min-w-0 text-left">
            <span className="block truncate font-display text-lg font-semibold leading-none text-bone">
              Asistente Kuntur
            </span>
            <span className="mt-1 block text-[0.64rem] font-extrabold uppercase tracking-[0.16em] text-sand/72">
              continuar chat
            </span>
          </span>
          <MessageCircle className="ml-2 shrink-0 text-sand transition group-hover:scale-110" size={19} />
        </button>
      ) : null}

      {!open && !minimized ? (
        <button
          onClick={restoreChat}
          className="bot-launcher group"
          aria-label="Abrir Asistente Kuntur"
        >
          <span className="bot-launcher-icon-wrap">
            <Bot className="bot-launcher-chat-icon" size={25} />
            <MessageCircle className="bot-launcher-bot-icon" size={23} />
          </span>
          <span className="bot-launcher-label">Planificar viaje</span>
        </button>
      ) : null}
    </div>
  );
}
