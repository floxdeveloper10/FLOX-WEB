// Asistente FLOX: árbol de opciones (sin inteligencia artificial ni servidor).
//
// Cómo editarlo:
// - Cada nodo tiene `messages` (lo que dice el asistente, en orden) y puede tener:
//   · `links`: botones a páginas de la web ({ label, to })
//   · `replies`: respuestas rápidas que llevan a otro nodo ({ label, to: 'idDelNodo' })
//     Si un nodo no tiene `replies`, se muestran las del inicio.
// - `userLabel` en una respuesta es lo que se ve como mensaje del visitante (si no, se usa `label`).
// - "Hablar con una persona" abre WhatsApp con un resumen de lo que eligió en la conversación.
import { serviceById } from './precios.js'
import { rubrosMenu } from './rubrosMenu.js'

const desde = (id) => `S/ ${serviceById[id].from.toLocaleString('es-PE')}`

export const asistenteUi = {
  name: 'Asistente FLOX',
  status: 'Responde al instante',
  typing: 'escribiendo...',
  open: 'Abrir el Asistente FLOX',
  close: 'Cerrar el asistente',
  restart: 'Volver al inicio',
  whatsapp: 'WhatsApp',
  whatsappLong: 'Escribir por WhatsApp',
  talk: 'Hablar con una persona',
  repliesLabel: 'Respuestas rápidas',
  // Mensaje de WhatsApp: saludo + lo que eligió
  whatsappIntro: 'Hola FLOX, vengo del asistente de la web.',
  whatsappChosen: 'Me interesa:',
}

// Rubros: "Tengo un restaurante", "Tengo un hotel"…
const RUBRO_TEXTS = {
  restaurantes: {
    label: 'Tengo un restaurante',
    messages: [
      '¡Buenísimo! 🍽️ Para restaurantes hacemos la carta digital con QR en varios idiomas, pedidos y delivery por WhatsApp, y tu perfil en Google Maps.',
      'Así los turistas leen la carta en su idioma y tú dejas de imprimir cartas cada vez que cambias un precio.',
    ],
  },
  hoteles: {
    label: 'Tengo un hotel',
    messages: [
      '¡Genial! 🛏️ Para hoteles y hostales hacemos una web con reservas directas por WhatsApp, sin pagar comisiones a las plataformas.',
      'También un chatbot que responde en inglés a cualquier hora y tu perfil de Google Maps con fotos y reseñas.',
    ],
  },
  'agencias-de-turismo': {
    label: 'Tengo una agencia',
    messages: [
      '¡Perfecto! 🎒 Para agencias de turismo hacemos una web bilingüe con catálogo de tours, calendario de salidas y reservas por WhatsApp.',
      'El turista arma su viaje y te llega el pedido completo, listo para confirmar.',
    ],
  },
  tiendas: {
    label: 'Tengo una tienda',
    messages: [
      '¡Bien! 🛍️ Para tiendas y minimarkets hacemos tu catálogo o tienda online con pedidos por WhatsApp.',
      'Y si quieres ordenar tu stock, una app de inventario con alertas cuando algo se está acabando.',
    ],
  },
  gimnasios: {
    label: 'Tengo un gimnasio',
    messages: [
      '¡Vamos! 💪 Para gimnasios hacemos una app con membresía y QR de ingreso, reserva de clases y rutinas.',
      'Tus socios reservan desde el celular y tú ves quién viene a cada clase.',
    ],
  },
  consultorios: {
    label: 'Tengo un consultorio',
    messages: [
      '¡Claro! 🗓️ Para consultorios, barberías y spas hacemos un sistema de citas en línea con recordatorios por WhatsApp.',
      'Tus clientes eligen su hora solos y reciben un recordatorio para que nadie falte.',
    ],
  },
}

const rubroNodes = Object.fromEntries(
  rubrosMenu.map((r) => [
    `rubro-${r.slug}`,
    {
      messages: RUBRO_TEXTS[r.slug].messages,
      links: [{ label: `Ver soluciones para ${r.menuName.toLowerCase()}`, to: `/soluciones/${r.slug}` }],
      replies: [
        { label: '¿Cuánto cuesta?', to: 'precios' },
        { label: 'Quiero ver demos', to: 'demos' },
      ],
    },
  ]),
)

export const asistente = {
  start: 'inicio',
  nodes: {
    inicio: {
      messages: ['¡Hola! Soy el asistente de FLOX 👋 ¿En qué te ayudo?'],
      replies: [
        { label: '¿Qué hacen?', to: 'servicios' },
        { label: '¿Cuánto cuesta?', to: 'precios' },
        ...rubrosMenu.map((r) => ({ label: RUBRO_TEXTS[r.slug].label, to: `rubro-${r.slug}` })),
        { label: 'Quiero ver demos', to: 'demos' },
      ],
    },
    servicios: {
      messages: [
        'Ayudamos a negocios de Cusco a vender más con tecnología simple:',
        '🌐 FLOX Web: páginas web, carta digital con QR y perfil de Google Maps.\n🤖 FLOX Auto: chatbot de WhatsApp que responde 24/7 y citas automáticas.\n📱 FLOX Apps: apps móviles a medida para Android e iPhone.',
        'Te visitamos, te mostramos una demo con tus datos y te enseñamos a usarlo.',
      ],
      links: [{ label: 'Ver servicios', to: '/servicios' }],
      replies: [
        { label: '¿Cuánto cuesta?', to: 'precios' },
        { label: 'Quiero ver demos', to: 'demos' },
      ],
    },
    precios: {
      messages: [
        `Estos son nuestros precios de lanzamiento:\n• Carta digital con QR: desde ${desde('carta')}\n• Web de una página: desde ${desde('web1')}\n• Perfil de Google Maps y redes: desde ${desde('maps')}\n• App móvil: cotización según tu proyecto`,
        'Trabajamos con 50 % de adelanto. En el cotizador armas tu proyecto y ves un precio referencial al instante.',
      ],
      links: [{ label: 'Usar el cotizador', to: '/cotizar' }],
      replies: [
        { label: '¿Qué hacen?', to: 'servicios' },
        { label: 'Quiero ver demos', to: 'demos' },
      ],
    },
    demos: {
      messages: [
        'Tenemos demos que puedes probar ahora mismo 👇',
        'En Proyectos: webs de hotel y agencia de turismo. En Apps: gimnasio, pedidos de restaurante e inventario.',
      ],
      links: [
        { label: 'Ver proyectos', to: '/proyectos' },
        { label: 'Ver apps', to: '/apps' },
      ],
      replies: [
        { label: '¿Cuánto cuesta?', to: 'precios' },
        { label: '¿Qué hacen?', to: 'servicios' },
      ],
    },
    // Al tocar "Hablar con una persona" se abre WhatsApp y el asistente dice esto
    persona: {
      messages: ['¡Listo! Te abrí WhatsApp con un resumen de lo que conversamos. Una persona del equipo te responde ahí 🙌'],
    },
    ...rubroNodes,
  },
}
