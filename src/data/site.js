// Datos reales de FLOX. Cambiar aquí y se actualiza en toda la web.
// Las redes pendientes van en null y no se muestran.
// Los precios están en src/data/precios.js (un solo lugar para todos).
import { serviceById } from './precios.js'

const PRICE = { carta: serviceById.carta.from, web1: serviceById.web1.from, maps: serviceById.maps.from }

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
  // ID de medición de Google Analytics 4 (Administrar → Flujos de datos → Web).
  // Mientras sea el valor de ejemplo "G-XXXXXXXXXX", no se carga nada de Google.
  gaId: 'G-XXXXXXXXXX',
}

const SOCIAL_NAMES = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok' }

// Redes con enlace: las que están en null no se muestran
export const socialLinks = Object.entries(site.social)
  .filter(([, url]) => url)
  .map(([name, url]) => ({ name, url, label: SOCIAL_NAMES[name] }))

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
    {
      name: 'FLOX Apps',
      accent: 'amarillo',
      summary: 'Apps móviles a medida para tu negocio: reservas, pedidos, inventario, membresías y lo que imagines. Para Android e iPhone.',
      features: [
        'Diseño con tu marca',
        'Para Android e iPhone',
        'Panel para administrarla tú mismo',
      ],
      cta: 'Ver apps de ejemplo',
      // Enlace a una página de la web (en vez de WhatsApp)
      link: '/apps',
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

// Secciones del inicio que también son rutas: #/precios abre el inicio y baja a Precios
export const HOME_SECTIONS = ['problemas', 'servicios', 'demo', 'como-trabajamos', 'precios', 'por-que-flox', 'contacto']

// Menú principal (encabezado, menú del celular y pie de página)
// section: es una sección del inicio · dropdown: 'soluciones' | 'proyectos' (muestra un desplegable)
// mobileOnly: solo en el menú del celular y el pie
export const nav = [
  // En escritorio el logo ya lleva al inicio (así cabe todo el menú)
  { id: 'inicio', label: 'Inicio', to: '/', mobileOnly: true },
  { id: 'servicios', label: 'Servicios', to: '/servicios', section: true },
  { id: 'soluciones', label: 'Soluciones', to: '/soluciones/restaurantes', dropdown: 'soluciones' },
  { id: 'proyectos', label: 'Proyectos', to: '/proyectos', dropdown: 'proyectos' },
  { id: 'apps', label: 'Apps', to: '/apps' },
  { id: 'nosotros', label: 'Nosotros', to: '/nosotros' },
  { id: 'precios', label: 'Precios', to: '/precios', section: true },
  { id: 'contacto', label: 'Contacto', to: '/contacto', section: true },
]

export const headerUi = {
  cta: 'Escríbenos',
  home: 'FLOX, ir al inicio',
  mainNav: 'Principal',
  openMenu: 'Abrir menú',
  closeMenu: 'Cerrar menú',
  projectsAll: 'Ver todos',
  quote: 'Cotizar',
  quoteLong: 'Cotiza tu proyecto',
  solutionsAll: 'Cotiza tu proyecto',
  expandSolutions: 'Ver soluciones por rubro',
  mobileCta: 'Escríbenos por WhatsApp',
}

export const pricing = {
  id: 'precios',
  title: 'Precios de lanzamiento',
  from: 'desde',
  cta: 'Lo quiero',
  featuredLabel: 'La más pedida',
  plans: [
    {
      name: 'Carta digital con QR',
      price: PRICE.carta,
      featured: true,
      features: [
        'Carta en español e inglés',
        'Código QR para tus mesas',
        'Cambios de precios y platos cuando quieras',
      ],
      message: `Hola FLOX, quiero la Carta digital con QR (desde S/ ${PRICE.carta})`,
    },
    {
      name: 'Web de una página',
      price: PRICE.web1,
      features: [
        'Diseño a tu medida',
        'Botón de WhatsApp',
        'Mapa de ubicación',
        'Se ve perfecta en celulares',
      ],
      message: `Hola FLOX, quiero la Web de una página (desde S/ ${PRICE.web1})`,
    },
    {
      name: 'Perfil de Google Maps y redes',
      price: PRICE.maps,
      features: [
        'Perfil de Google configurado',
        'Fotos y horarios',
        'Facebook e Instagram con tu marca',
      ],
      message: `Hola FLOX, quiero el Perfil de Google Maps y redes (desde S/ ${PRICE.maps})`,
    },
    {
      name: 'App móvil a medida',
      tag: 'FLOX Apps',
      // Sin monto: se cotiza según las funciones de cada app
      quote: 'Cotización según tu proyecto',
      features: [
        'Diseño personalizado',
        'Android e iPhone',
        'Panel para administrar',
        'Soporte',
      ],
      cta: 'Cotizar mi app',
      message: 'Hola FLOX, quiero cotizar una app móvil a medida para mi negocio',
    },
  ],
  note: 'Precio de lanzamiento para los primeros clientes. Trabajamos con 50 % de adelanto.',
  custom: {
    before: '¿Necesitas algo distinto?',
    link: 'Escríbenos',
    after: 'y te armamos una propuesta.',
    message: 'Hola FLOX, necesito algo distinto para mi negocio. ¿Me arman una propuesta?',
  },
  quote: {
    text: '¿Quieres saber cuánto costaría todo junto?',
    button: 'Cotiza tu proyecto',
  },
}

export const whyFlox = {
  id: 'por-que-flox',
  eyebrow: 'Por qué FLOX',
  title: 'Tecnología con trato cercano',
  reasons: [
    {
      icon: 'visita',
      title: 'Somos de Cusco y te visitamos',
      text: 'Conocemos tu negocio y a tus clientes.',
    },
    {
      icon: 'simple',
      title: 'Sin términos técnicos',
      text: 'Te explicamos todo en simple y te enseñamos a usarlo.',
    },
    {
      icon: 'soporte',
      title: 'Soporte por WhatsApp',
      text: 'Si algo pasa, nos escribes y lo resolvemos.',
    },
  ],
}

export const contact = {
  id: 'contacto',
  title: '¿Listo para vender más?',
  lead: 'Escríbenos y te mostramos una demo con los datos de tu negocio, sin compromiso.',
  cta: 'Escríbenos por WhatsApp',
  emailLabel: 'Correo',
  cityLabel: 'Ubicación',
  socialLabel: 'Síguenos',
}

export const footer = {
  madeIn: 'Hecho en Cusco',
  navLabel: 'Enlaces rápidos',
  privacy: 'Privacidad',
  cookies: 'Cookies',
}
