// REVISAR: precios de ejemplo, ajustar antes de publicar.
//
// Todos los precios de FLOX salen de este archivo (cotizador, páginas de rubro y Precios).
// Los que llevan "// EJEMPLO" son valores de ejemplo: cámbialos por los reales.
// Montos en soles (S/), precio "desde" (el final se confirma al conocer el negocio).

// Servicios que se pueden cotizar
// quote: true → no tiene precio fijo: "Cotización personalizada" (apps móviles)
export const services = [
  {
    id: 'carta',
    name: 'Carta digital con QR',
    detail: 'Carta en español e inglés, con fotos y QR para tus mesas.',
    from: 250, // precio real (Precios de lanzamiento)
  },
  {
    id: 'web1',
    name: 'Web de una página',
    detail: 'Tu negocio en Google, con botón de WhatsApp y mapa.',
    from: 600, // precio real (Precios de lanzamiento)
  },
  {
    id: 'maps',
    name: 'Perfil de Google Maps y redes',
    detail: 'Perfil de Google configurado, fotos, horarios y redes con tu marca.',
    from: 150, // precio real (Precios de lanzamiento)
  },
  {
    id: 'webPlus',
    name: 'Web de varias páginas',
    detail: 'Varias secciones, galería, reservas o catálogo, en varios idiomas.',
    from: 1200, // EJEMPLO
  },
  {
    id: 'tienda',
    name: 'Tienda online',
    detail: 'Catálogo con carrito y pedidos por WhatsApp o pago en línea.',
    from: 1800, // EJEMPLO
  },
  {
    id: 'chatbot',
    name: 'Chatbot de WhatsApp',
    detail: 'Responde preguntas frecuentes y toma reservas las 24 horas.',
    from: 450, // EJEMPLO
  },
  {
    id: 'citas',
    name: 'Sistema de citas con recordatorios',
    detail: 'Agenda en línea y recordatorio por WhatsApp para que nadie falte.',
    from: 500, // EJEMPLO
  },
  {
    id: 'app',
    name: 'App móvil a medida',
    detail: 'Para Android e iPhone, con panel para administrarla.',
    quote: true, // sin precio: cotización personalizada
  },
]

// Extras: solo aparecen si aplican a lo elegido (appliesTo: ids de servicios)
export const extras = [
  {
    id: 'ingles',
    name: 'Versión en inglés',
    detail: 'Todo el contenido también en inglés, para turistas.',
    price: 150, // EJEMPLO
    appliesTo: ['web1', 'webPlus', 'tienda', 'chatbot'],
  },
  {
    id: 'fotos',
    name: 'Sesión de fotos',
    detail: 'Fotos profesionales de tu local y tus productos (hasta 20).',
    price: 250, // EJEMPLO
    appliesTo: ['carta', 'web1', 'webPlus', 'tienda', 'maps'],
  },
  {
    id: 'textos',
    name: 'Redacción de textos',
    detail: 'Escribimos los textos de tu web para que vendan.',
    price: 150, // EJEMPLO
    appliesTo: ['web1', 'webPlus', 'tienda'],
  },
  {
    id: 'dominio',
    name: 'Dominio propio .pe (1 año)',
    detail: 'Tu dirección propia, por ejemplo tunegocio.pe.',
    price: 120, // EJEMPLO
    appliesTo: ['web1', 'webPlus', 'tienda'],
  },
  {
    id: 'capacitacion',
    name: 'Capacitación para tu equipo',
    detail: 'Dos horas para que tu equipo lo use sin ayuda.',
    price: 100, // EJEMPLO
    appliesTo: 'all',
  },
]

// Urgencia: el recargo se aplica sobre servicios + extras
export const urgency = [
  { id: 'normal', name: 'Normal', detail: 'Tiempos de entrega habituales.', surcharge: 0 },
  {
    id: 'urgente',
    name: 'Urgente',
    detail: 'Lo priorizamos para entregarlo en menos tiempo.',
    surcharge: 0.2, // EJEMPLO: recargo del 20 %
  },
]

// Adelanto para empezar el trabajo (como en Precios: "Trabajamos con 50 % de adelanto")
export const ADVANCE = 0.5

export const priceNote = 'Precio referencial. Te confirmamos el precio final después de conocer tu negocio.'

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s]))
export const extraById = Object.fromEntries(extras.map((e) => [e.id, e]))

// "desde S/ 600" o "Cotización personalizada"
export function fromLabel(service) {
  return service.quote ? 'Cotización personalizada' : `desde S/ ${service.from.toLocaleString('es-PE')}`
}

// Extras que aplican a los servicios elegidos
export function extrasFor(serviceIds) {
  return extras.filter((e) => e.appliesTo === 'all' ? serviceIds.length > 0 : e.appliesTo.some((id) => serviceIds.includes(id)))
}

// Total estimado: servicios con precio + extras que aplican, más el recargo por urgencia
export function estimate({ services: serviceIds = [], extras: extraIds = [], urgency: urgencyId = 'normal' }) {
  const chosen = serviceIds.map((id) => serviceById[id]).filter(Boolean)
  const priced = chosen.filter((s) => !s.quote)
  const validExtras = extrasFor(serviceIds).filter((e) => extraIds.includes(e.id))
  const base = priced.reduce((sum, s) => sum + s.from, 0) + validExtras.reduce((sum, e) => sum + e.price, 0)
  const rate = urgency.find((u) => u.id === urgencyId)?.surcharge ?? 0
  const surcharge = Math.round(base * rate)
  const total = base + surcharge
  return {
    services: chosen,
    extras: validExtras,
    hasApp: chosen.some((s) => s.quote),
    base,
    surcharge,
    total,
    advance: Math.round(total * ADVANCE),
  }
}
