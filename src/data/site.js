// Datos reales de FLOX. Cambiar aquí y se actualiza en toda la web.
// Las redes pendientes van en null y no se muestran.

const WHATSAPP_NUMBER = '51927484492'
const WHATSAPP_DEFAULT_MESSAGE = 'Hola FLOX, quiero una demo para mi negocio'

export const site = {
  name: 'FLOX',
  city: 'Cusco, Perú',
  email: 'developerflox@gmail.com',
  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: '+51 927 484 492',
    defaultMessage: WHATSAPP_DEFAULT_MESSAGE,
    link: 'https://wa.me/51927484492?text=Hola%20FLOX%2C%20quiero%20una%20demo%20para%20mi%20negocio',
  },
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61576914354970',
    instagram: null,
    tiktok: null,
  },
  github: 'floxdeveloper10',
  url: 'https://floxdeveloper10.github.io/flox-web/',
}

// Enlace de WhatsApp con un mensaje propio (por ejemplo, el botón "Lo quiero" de cada precio).
export function whatsappLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// ─── Textos de las secciones ─────────────────────────────────────────────
// accent: color de marca de cada tarjeta (fucsia | naranja | turquesa)

export const problems = {
  id: 'problemas',
  eyebrow: 'Problemas que resolvemos',
  title: '¿Te pasa algo de esto?',
  items: [
    {
      icon: 'idiomas',
      accent: 'fucsia',
      question: '¿Los turistas te piden la carta en inglés?',
      solution: 'Carta digital multilingüe con QR: la escanean y la leen en su idioma.',
    },
    {
      icon: 'chat',
      accent: 'naranja',
      question: '¿Pierdes clientes porque no respondes WhatsApp a tiempo?',
      solution: 'Un chatbot que responde 24/7, incluso cuando estás atendiendo.',
    },
    {
      icon: 'mapa',
      accent: 'turquesa',
      question: '¿Tu negocio no aparece en Google Maps?',
      solution: 'Configuramos tu perfil para que te encuentren al buscar cerca.',
    },
  ],
}

export const services = {
  id: 'servicios',
  eyebrow: 'Servicios',
  title: 'Todo lo que tu negocio necesita para vender más',
  items: [
    {
      name: 'FLOX Web',
      accent: 'fucsia',
      summary: 'Que te encuentren y te entiendan, en cualquier idioma.',
      features: [
        'Página web para tu negocio',
        'Carta digital con QR en varios idiomas',
        'Perfil de Google Maps',
        'Redes sociales listas para usar',
      ],
      cta: 'Pregunta por WhatsApp',
      message: 'Hola FLOX, quiero saber más sobre FLOX Web (web, carta digital con QR y Google Maps)',
    },
    {
      name: 'FLOX Auto',
      accent: 'naranja',
      summary: 'Atiende a tus clientes aunque no tengas tiempo.',
      features: [
        'Chatbot de WhatsApp que responde 24/7',
        'Reservas y citas automáticas',
        'Recordatorios para que nadie falte',
      ],
      cta: 'Pregunta por WhatsApp',
      message: 'Hola FLOX, quiero saber más sobre FLOX Auto (chatbot de WhatsApp y citas)',
    },
    {
      name: 'FLOX Sense',
      accent: 'turquesa',
      comingSoon: 'Próximamente',
      summary: 'Evita perder productos por un equipo que falla.',
      features: [
        'Sensores para refrigeradoras y tanques',
        'Alertas al instante por WhatsApp',
        'Te avisa antes de que haya pérdidas',
      ],
      cta: 'Avísame cuando esté listo',
      message: 'Hola FLOX, avísenme cuando FLOX Sense (sensores con alertas por WhatsApp) esté listo',
    },
  ],
}

export const howWeWork = {
  id: 'como-trabajamos',
  eyebrow: 'Cómo trabajamos',
  title: 'Simple, en 3 pasos',
  steps: [
    {
      title: 'Visitamos tu negocio',
      text: 'Conversamos contigo y vemos dónde estás perdiendo tiempo o clientes.',
    },
    {
      title: 'Te mostramos una demo con tus datos',
      text: 'Sin compromiso: ves cómo quedaría con tu carta, tus precios y tu marca.',
    },
    {
      title: 'Lo dejamos funcionando y te enseñamos a usarlo',
      text: 'Te explicamos paso a paso y seguimos contigo por WhatsApp.',
    },
  ],
}

export const demo = {
  id: 'demo',
  title: 'Pruébalo tú mismo',
  lead: 'Así funciona lo que hacemos para tu negocio. Toca, cambia el idioma y mira cómo responde.',
  menu: {
    label: 'Carta digital con QR',
    qrCaption: 'Así la ven tus clientes al escanear el QR de su mesa',
    cta: 'Quiero una carta así',
    message: 'Hola FLOX, quiero una carta así',
  },
  chat: {
    label: 'Chatbot de WhatsApp',
    note: 'El bot responde en el idioma del turista, las 24 horas.',
    replay: 'Repetir conversación',
    cta: 'Quiero un chatbot así',
    message: 'Hola FLOX, quiero un chatbot así',
    online: 'en línea',
    typing: 'escribiendo...',
    // from: 'guest' (turista, burbuja verde) | 'bot' (restaurante, burbuja blanca)
    messages: [
      { from: 'guest', time: '19:02', text: 'Hi! Do you have a table for 4 tonight at 8 pm?' },
      { from: 'bot', time: '19:02', text: 'Hi! 👋 Yes, we have a table for 4 at 8:00 pm. May I have your name?' },
      { from: 'guest', time: '19:03', text: 'Sarah' },
      { from: 'bot', time: '19:03', text: 'Perfect, Sarah! Your table is booked for tonight at 8:00 pm ✅' },
      { from: 'bot', time: '19:03', type: 'location' },
    ],
  },
}
