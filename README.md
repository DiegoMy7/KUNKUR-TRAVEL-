# Kuntur Travel

Landing premium para una agencia ficticia de viajes locales por Perú con un asistente inteligente como valor añadido. El proyecto está pensado como pieza de portafolio frontend: visual, responsive, editorial y con animaciones avanzadas.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis para smooth scroll
- lucide-react para iconografía
- API route preparada para OpenAI, xAI/Grok, Groq y modo demo

## Funciones principales

- Hero cinematográfico con imagen remota, parallax y dashboard flotante.
- Secuencia scroll-driven con pinning y crossfade controlado por GSAP ScrollTrigger.
- Grid de destinos con datos separados en `data/destinations.ts`.
- Sección de planificador inteligente con maqueta de chat.
- Chatbot flotante Asistente Kuntur con prompts rápidos, loading state, fallback inteligente y respuestas demo.
- Paquetes visuales en `data/packages.ts`.
- Bento grid, storytelling editorial, testimonios ficticios, CTA final y footer.
- Respeto por `prefers-reduced-motion`.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Chatbot con API real

El chatbot funciona sin configuración usando respuestas demo. Para conectarlo a IA real, crea `.env.local`:

```bash
OPENAI_API_KEY=tu_api_key
OPENAI_MODEL=gpt-4o-mini
XAI_API_KEY=tu_api_key_de_xai
XAI_MODEL=grok-4.3
GROQ_API_KEY=tu_api_key_de_groq
GROQ_MODEL=llama-3.3-70b-versatile
```

La ruta está en `app/api/chat/route.ts`. Primero intenta OpenAI; si falla por cuota, red o error de proveedor, intenta xAI/Grok; luego Groq; si tampoco hay respuesta, vuelve automáticamente al modo demo.

Nunca subas `.env.local` a GitHub. Para compartir el proyecto, usa `.env.example` como plantilla y configura las llaves reales solo en tu máquina o en Vercel.

## Deploy en Vercel

El proyecto está preparado para Vercel. Configura `OPENAI_API_KEY`, `OPENAI_MODEL`, `XAI_API_KEY`, `XAI_MODEL`, `GROQ_API_KEY` y `GROQ_MODEL` en el dashboard si quieres respuestas reales del chatbot.

Pasos sugeridos:

```bash
git init
git add .
git commit -m "Prepare Kuntur Travel for deployment"
```

Luego crea un repositorio en GitHub, sube el proyecto y en Vercel importa ese repositorio. En Vercel agrega las variables de entorno privadas antes del primer deploy productivo.

## Highlights para portafolio

- Arquitectura por componentes reutilizables.
- Datos separados para escalar destinos, paquetes y caso práctico.
- Scroll storytelling con pinning.
- Dirección visual premium con imágenes remotas, overlays y microinteracciones.
- UX responsive cuidada para desktop y móvil.
