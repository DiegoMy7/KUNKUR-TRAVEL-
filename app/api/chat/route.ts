import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatBody = {
  message?: string;
  messages?: ChatMessage[];
};

type ProviderMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatCompletionResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

const greetingReply = `Hola, soy el Asistente Kuntur.
Puedo ayudarte a elegir una ruta por Perú según presupuesto, días, ciudad de salida y estilo de viaje.
Para armarte una recomendación útil, dime algo como: "S/700, 3 días, pareja, desde Lima" o "quiero aventura con amigos".`;

const identityReply = `Soy el Asistente Kuntur, tu asesor turístico digital para armar rutas por Perú.
Puedo recomendar destinos, comparar opciones, estimar presupuesto, sugerir duración, darte tips de clima y preparar una ruta lista para consultar por WhatsApp.
Para ayudarte bien, dime presupuesto, ciudad de origen, cantidad de días, número de viajeros y estilo de viaje.`;

const contactReply = `Puedes continuar la asesoría por WhatsApp con Kuntur Travel.
Número: 965 338 001.
Si quieres, dime primero presupuesto, fechas, ciudad de salida y cantidad de viajeros; con eso preparo un resumen ordenado para enviarlo.`;

const destinationsReply = `Tenemos rutas recomendadas por Lima, Ica, Paracas, Huacachina, Cusco, Arequipa, Huaraz, Puno, Tarapoto, Ayacucho y La Libertad.
Para elegir bien, dime si buscas cultura, aventura, fotos, comida, naturaleza o descanso.
Si sales desde Lima y tienes pocos días, las opciones más prácticas son Paracas + Huacachina, Lima gastronómica, Huaraz corto o Ica.`;

const pricingReply = `Los presupuestos son aproximados y dependen de fecha, transporte, hospedaje y cantidad de viajeros.
Como referencia: full day desde Lima puede ir desde S/180 a S/350; escapadas de 2 a 3 días desde S/520 a S/850; rutas premium como Cusco suelen partir desde S/890 sin vuelos.
Si me das presupuesto, días y ciudad de salida, te propongo una ruta que no se dispare.`;

const paymentReply = `Para una reserva real se debe confirmar disponibilidad, fecha, cantidad de viajeros y condiciones del proveedor.
En esta demo no procesamos pagos dentro de la web; el flujo correcto es asesoría por chat, resumen de ruta y cierre por WhatsApp con un asesor.
Esto evita cobros improvisados y permite validar horarios, entradas y transporte antes de pagar.`;

const safetyReply = `Sí, la idea es priorizar rutas seguras, horarios claros y proveedores verificables.
Para viajar mejor: evita traslados muy tarde, separa actividades fuertes por altura, confirma puntos de encuentro y lleva documentos físicos/digitales.
Si viajas en pareja, familia o con amigos, puedo ajustar el ritmo para que no sea cansado.`;

const weatherReply = `Depende del destino. Costa como Lima, Paracas e Ica suele requerir bloqueador, lentes y cortaviento; Andes como Cusco, Huaraz o Arequipa necesita capas, casaca y margen por altura; selva como Tarapoto pide repelente, ropa ligera y zapatillas con agarre.
Si me dices destino y mes, te doy una lista exacta de ropa y horario recomendado.`;

const ecommerceReply = `En un flujo de e-commerce turístico, el chatbot reduce dudas antes de la compra: presupuesto, duración, destino, disponibilidad, clima, seguridad y contacto.
El objetivo no es reemplazar al asesor humano, sino filtrar intención, recomendar una ruta inicial y llevar al usuario a WhatsApp con información ordenada.
Así se reducen abandonos por indecisión y se mejora la conversión del sitio.`;

const alternativeReply = `Claro, cambiamos la ruta.
Destino recomendado: Arequipa + Colca
Por qué encaja: es una alternativa fuerte si no quieres la ruta anterior: combina ciudad bonita, gastronomía, miradores y paisaje andino.
Duración ideal: 4 días / 3 noches.
Presupuesto aproximado: S/760 a S/1,150 por persona sin vuelos.
Itinerario sugerido: Día 1 centro histórico y miradores / Día 2 ruta al Colca / Día 3 mirador del cóndor y termales / Día 4 retorno tranquilo.
Actividades clave: Monasterio de Santa Catalina, Yanahuara, Cañón del Colca, mirador del cóndor y comida arequipeña.
Tips: lleva capas por el cambio de altura, no cargues demasiado el primer día y reserva Colca temprano.
CTA final: dime qué no te gustó de la ruta anterior y te propongo otra opción más precisa.`;

const destinationKnowledge = `
Base de destinos Kuntur:
- Cusco: Machu Picchu, Sacsayhuamán, Ollantaytambo, Moray, San Blas y Valle Sagrado. Ideal para cultura, fotos, historia y rutas premium de 4 a 5 días.
- Ica, Paracas y Huacachina: Islas Ballestas, Reserva Nacional de Paracas, dunas, buggies, sandboard y sunset. Ideal desde Lima para full day, 2 o 3 días.
- Lima: gastronomía, centro histórico, Miraflores, Barranco, costa verde y planes nocturnos. Ideal para presupuesto corto, foodies o primera toma de contacto.
- Huaraz y Áncash: Cordillera Blanca, Laguna Parón, Laguna 69, trekking y paisajes de montaña. Ideal para aventura, amigos y viajeros activos.
- Arequipa: ciudad blanca, miradores, gastronomía y Cañón del Colca. Ideal para cultura, paisajes y rutas de 3 a 4 días.
- Puno: Lago Titicaca, islas Uros, Taquile y cultura altiplánica. Ideal para cultura viva y conexión con comunidades.
- Tarapoto y San Martín: cataratas, Laguna Azul, Lamas, café, cacao y selva accesible. Ideal para naturaleza cálida, relajación y fotos.
- Ayacucho y Quinua: cerámica, arquitectura colonial, memoria histórica, Pampa de Ayacucho y caminatas. Ideal para cultura con presupuesto medio.
- La Libertad: Trujillo, Chan Chan, Huanchaco y Malabrigo/Puerto Chicama. Ideal para arqueología, playa, surf y comida marina.

Reglas de asesoría:
- Si el usuario sale desde Lima y tiene pocos días, prioriza Paracas, Huacachina, Lima, Huaraz corto o Ica.
- Si pide historia/cultura/premium, prioriza Cusco, Arequipa, Puno o Ayacucho.
- Si pide aventura, prioriza Huaraz, Colca, Tarapoto o Huacachina.
- Si pide pareja/fotos/sunset, prioriza Paracas + Huacachina, Cusco, Barranco/Lima o Arequipa.
- Si pide selva/calor/cataratas, prioriza Tarapoto + Lamas.
- No prometas disponibilidad real, reservas confirmadas ni precios exactos. Da rangos aproximados y pide datos finales.
`;

const systemPrompt = `Eres el Asistente Kuntur, un asesor turístico premium especializado en viajes por Perú.
Tu objetivo es impresionar en una presentación académica: responde con seguridad, orden y utilidad real.

${destinationKnowledge}

Formato obligatorio:
Destino recomendado: [nombre claro del destino o ruta]
Por qué encaja: [explicación breve y personalizada]
Duración ideal: [número de días/noches]
Presupuesto aproximado: [rango en soles por persona, aclara si no incluye vuelos]
Itinerario sugerido: [día 1 / día 2 / día 3 en una sola línea clara]
Actividades clave: [3 a 5 actividades concretas]
Tips: [clima, ropa, transporte, seguridad o timing]
CTA final: [invita a enviar fecha, número de viajeros y estilo; menciona que puede pasarse por WhatsApp]

Mantén las etiquetas exactamente como están para que la interfaz las convierta en tarjetas.
Responde siempre en español.
No uses markdown con tablas.
No inventes reservas reales, hoteles disponibles ni confirmaciones de pago.

Si el usuario solo saluda, no recomiendes paquete todavía: saluda, pide presupuesto, días, origen y estilo.
Si el usuario pregunta quién eres, qué haces o cómo funciona el bot, explica tu rol y pide datos; no recomiendes paquete todavía.
Si el usuario pide contacto, WhatsApp o teléfono, responde con 965 338 001 y ofrece preparar un resumen.
Si pregunta por precios, pagos, seguridad, clima, destinos, reservas, cancelaciones o el flujo de compra, responde directo y útil; no fuerces siempre un paquete.
Si el usuario rechaza una ruta con frases como "no quiero ese", "otro", "no me gusta" o "cambia", reconoce el rechazo y ofrece una alternativa distinta explicando por qué cambia.`;

function demoReply(message: string) {
  const text = message.toLowerCase();
  const isGreeting = /^(hola|holaa|buenas|buenos dias|buenos días|buenas tardes|buenas noches|hey|ola)[!.¡!?\s]*$/.test(text);
  const asksIdentity = /quien eres|quién eres|que eres|qué eres|como funcionas|cómo funcionas|que haces|qué haces|ayuda|help|bot|asistente/.test(text);
  const asksContact = /contacto|whatsapp|wasap|wsp|telefono|teléfono|numero|número|llamar|asesor/.test(text);
  const asksDestinations = /destinos|lugares|a donde|adonde|dónde puedo ir|donde puedo ir|opciones|paquetes|rutas/.test(text);
  const asksPricing = /precio|precios|cuanto|cuánto|cuesta|costo|costos|presupuesto|barato|económico|economico/.test(text);
  const asksPayment = /pago|pagar|reserva|reservar|reservo|confirmar|disponibilidad|tarjeta|yape|plin|cancelaci[oó]n|reembolso|comprar/.test(text);
  const asksSafety = /seguro|seguridad|peligro|confiable|familia|niños|ninos|adulto mayor|cansado|altura/.test(text);
  const asksEcommerce = /ecommerce|e-commerce|tienda|compra|flujo|cliente|caso práctico|caso practico|ai-900|azure/.test(text);
  const hasRouteDetails = /s\/|\d+\s*d[ií]as|desde|salgo|salimos|viaje|viajar|pareja|amigos|familia|quiero ir/.test(text);
  const wantsAlternative = /no quiero|no me gusta|otro|otra|cambia|alternativa|ese no|esa no|no ese|no esa|no quiero ese|no quiero esa/.test(text);
  const isAdventure = /aventura|trek|montaña|montana|huaraz|laguna|amigos|adrenalina/.test(text);
  const isRomantic = /pareja|romant|fotos|bonito|sunset|atardecer/.test(text);
  const isBudget = /bajo|barato|600|500|400|full day|1 dia|1 día|económico|economico/.test(text);
  const isJungle = /selva|tarapoto|catarata|calor|lamas|cacao|café|cafe/.test(text);
  const isCulture = /cultura|historia|machu|cusco|cuzco|arequipa|puno|titicaca|ayacucho/.test(text);
  const asksWeather = /clima|ropa|temporada|llevar|frio|frío|calor|lluvia/.test(text);

  if (isGreeting) {
    return greetingReply;
  }

  if (asksIdentity) {
    return identityReply;
  }

  if (asksContact) {
    return contactReply;
  }

  if (asksEcommerce) {
    return ecommerceReply;
  }

  if (asksPayment) {
    return paymentReply;
  }

  if (asksSafety) {
    return safetyReply;
  }

  if (asksDestinations) {
    return destinationsReply;
  }

  if (asksPricing && !hasRouteDetails) {
    return pricingReply;
  }

  if (wantsAlternative) {
    return alternativeReply;
  }

  if (asksWeather) {
    return weatherReply;
  }

  if (isJungle) {
    return `Destino recomendado: Tarapoto + Lamas
Por qué encaja: combina cataratas, selva accesible, café, cacao y cultura local sin sentirse como una ruta común.
Duración ideal: 4 días / 3 noches.
Presupuesto aproximado: S/740 a S/1,100 por persona sin vuelos.
Itinerario sugerido: Día 1 llegada y mirador / Día 2 Laguna Azul / Día 3 cataratas y Lamas / Día 4 café, compras y retorno.
Actividades clave: Ahuashiyacu, Laguna Azul, Castillo de Lamas, cacao/café local y cena tranquila.
Tips: lleva repelente, ropa ligera, zapatillas con agarre y una muda para agua.
CTA final: dime fecha tentativa y viajeros para convertirlo en plan listo para WhatsApp.`;
  }

  if (isAdventure) {
    return `Destino recomendado: Huaraz Aventura
Por qué encaja: tiene lagunas turquesa, Cordillera Blanca y rutas de impacto visual para viajeros activos.
Duración ideal: 4 días / 3 noches.
Presupuesto aproximado: S/620 a S/980 por persona desde Lima, sin vuelos.
Itinerario sugerido: Día 1 aclimatación / Día 2 Laguna Parón / Día 3 Laguna 69 o alternativa suave / Día 4 miradores y retorno.
Actividades clave: trekking, miradores andinos, fotografía de montaña, comida local y descanso por altura.
Tips: no juntes dos trekkings fuertes seguidos; lleva capas, agua, snacks y margen por aclimatación.
CTA final: dime nivel físico del grupo y fecha para ajustar intensidad y presupuesto.`;
  }

  if (isRomantic || isBudget) {
    return `Destino recomendado: Paracas + Huacachina
Por qué encaja: es cercano a Lima, fotográfico, seguro para una escapada y muy defendible en presupuesto.
Duración ideal: 3 días / 2 noches.
Presupuesto aproximado: S/520 a S/760 por persona según hospedaje y tours.
Itinerario sugerido: Día 1 Paracas y sunset / Día 2 Islas Ballestas, reserva e Ica / Día 3 Huacachina, dunas y retorno.
Actividades clave: Islas Ballestas, Reserva de Paracas, buggies, sandboard suave y cena frente al atardecer.
Tips: reserva dunas por la tarde, lleva cortaviento, bloqueador y evita regresar muy tarde.
CTA final: dime fecha, número de viajeros y si prefieres plan romántico o aventura suave para enviarlo por WhatsApp.`;
  }

  if (isCulture) {
    return `Destino recomendado: Cusco Místico
Por qué encaja: es la ruta más fuerte para cultura, historia, fotos y sensación premium dentro de Perú.
Duración ideal: 5 días / 4 noches.
Presupuesto aproximado: S/890 a S/1,480 por persona sin vuelos.
Itinerario sugerido: Día 1 aclimatación y San Blas / Día 2 Valle Sagrado / Día 3 Machu Picchu / Día 4 Moray y miradores / Día 5 retorno.
Actividades clave: Machu Picchu, Ollantaytambo, Sacsayhuamán, Moray, mercados y cena local.
Tips: compra entradas con anticipación, deja margen por altura y no llenes el primer día.
CTA final: dime mes de viaje y presupuesto para ajustar tren, entradas y ritmo del itinerario.`;
  }

  return `Destino recomendado: Lima + Paracas + Huacachina
Por qué encaja: muestra costa, gastronomía, reserva natural y desierto en una ruta clara para presentar.
Duración ideal: 4 días / 3 noches.
Presupuesto aproximado: S/690 a S/980 por persona sin vuelos.
Itinerario sugerido: Día 1 Lima gastronómica / Día 2 Paracas e Islas Ballestas / Día 3 Huacachina y dunas / Día 4 retorno con parada en Ica.
Actividades clave: Barranco, comida local, Reserva de Paracas, Islas Ballestas, buggies y sunset en dunas.
Tips: ideal para salir desde Lima; lleva bloqueador, cortaviento y separa el tour de dunas para la tarde.
CTA final: dime fecha tentativa, viajeros y estilo para dejarlo listo como cotización por WhatsApp.`;
}

async function requestChatCompletion({
  apiKey,
  endpoint,
  model,
  messages
}: {
  apiKey: string;
  endpoint: string;
  model: string;
  messages: ProviderMessage[];
}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.62,
      max_tokens: 700,
      messages
    })
  });

  if (!response.ok) return null;

  const data = (await response.json()) as ChatCompletionResponse;
  return data.choices?.[0]?.message?.content?.trim() || null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ChatBody;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ reply: "Destino recomendado: Perú a medida\nPor qué encaja: necesito presupuesto, días, origen y estilo para asesorarte bien.\nDuración ideal: según disponibilidad.\nPresupuesto aproximado: lo calculo cuando me des rango.\nItinerario sugerido: envíame tus datos y armo la ruta.\nActividades clave: cultura, aventura, gastronomía o descanso.\nTips: mientras más concreto seas, mejor será el plan.\nCTA final: escribe algo como: S/700, 3 días, pareja, desde Lima." });
  }

  const recentMessages = (body.messages ?? [])
    .filter((item) => item.content?.trim())
    .slice(-8)
    .map((item) => ({
      role: item.role as "user" | "assistant",
      content: item.content.slice(0, 1000)
    }));

  const providerMessages: ProviderMessage[] = [
    { role: "system", content: systemPrompt },
    ...recentMessages,
    { role: "user", content: message }
  ];

  const openaiApiKey = process.env.OPENAI_API_KEY;
  const xaiApiKey = process.env.XAI_API_KEY;
  const groqApiKey = process.env.GROQ_API_KEY;

  if (openaiApiKey) {
    try {
      const reply = await requestChatCompletion({
        apiKey: openaiApiKey,
        endpoint: "https://api.openai.com/v1/chat/completions",
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        messages: providerMessages
      });

      if (reply) return NextResponse.json({ reply, mode: "openai" });
    } catch {
      // Fall through to xAI, Groq or local demo.
    }
  }

  if (xaiApiKey) {
    try {
      const reply = await requestChatCompletion({
        apiKey: xaiApiKey,
        endpoint: "https://api.x.ai/v1/chat/completions",
        model: process.env.XAI_MODEL ?? "grok-4.3",
        messages: providerMessages
      });

      if (reply) return NextResponse.json({ reply, mode: "xai" });
    } catch {
      // Fall through to Groq or local demo.
    }
  }

  if (groqApiKey) {
    try {
      const reply = await requestChatCompletion({
        apiKey: groqApiKey,
        endpoint: "https://api.groq.com/openai/v1/chat/completions",
        model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
        messages: providerMessages
      });

      if (reply) return NextResponse.json({ reply, mode: "groq" });
    } catch {
      // Fall through to local demo.
    }
  }

  if (!openaiApiKey && !xaiApiKey && !groqApiKey) {
    return NextResponse.json({ reply: demoReply(message), mode: "demo" });
  }

  return NextResponse.json({ reply: demoReply(message), mode: "demo-fallback" });
}
