// Soluciones por rubro: una sola plantilla (src/pages/Solucion.jsx) se llena con estos datos.
// Ruta: /soluciones/:slug
//
// services: ids de src/data/precios.js (con una línea propia del rubro)
// demo.kind: 'restaurante' (carta + Qhapaq Pedidos) | 'site' (web demo) | 'app' (app demo en vivo) | 'chat' (guion de chat)
// suggested: servicios marcados como "sugeridos" en el cotizador

import { rubrosMenu } from './rubrosMenu.js'

const content = [
  {
    slug: 'restaurantes',
    hero: {
      eyebrow: 'Para restaurantes, picanterías y cafés',
      title: 'Más pedidos, menos mesas vacías',
      lead: 'Carta digital en varios idiomas, pedidos desde el celular y un WhatsApp que responde solo, para que vendas más sin sumar personal.',
    },
    problems: [
      { icon: 'idiomas', question: '¿Los turistas no entienden tu carta?', solution: 'Carta digital con QR en español e inglés, con fotos de cada plato.' },
      { icon: 'chat', question: '¿Pierdes reservas porque no alcanzas a contestar?', solution: 'Un chatbot de WhatsApp toma reservas a cualquier hora.' },
      { icon: 'app', question: '¿Las apps de delivery se quedan con parte de cada pedido?', solution: 'Tu propia app de pedidos y delivery, sin comisión por pedido.' },
    ],
    services: [
      { id: 'carta', text: 'Tus clientes ven la carta al escanear el QR de la mesa, en su idioma.' },
      { id: 'chatbot', text: 'Reservas y preguntas resueltas por WhatsApp, de día y de noche.' },
      { id: 'app', text: 'Pedidos para recoger, en mesa o delivery, con panel de cocina.' },
      { id: 'maps', text: 'Que te encuentren cuando buscan "restaurante cerca" en Google Maps.' },
    ],
    demo: {
      kind: 'restaurante',
      title: 'Pruébalo como lo usarían tus clientes',
      lead: 'La carta digital de la Picantería Qhapaq y su app de pedidos. Son demos con un restaurante ficticio.',
    },
    faqs: [
      { q: '¿Puedo cambiar precios y platos yo mismo?', a: 'Sí. Desde un panel sencillo cambias precios, fotos y platos cuando quieras, y el QR de tus mesas sigue siendo el mismo.' },
      { q: '¿Mis clientes tienen que descargar algo para ver la carta?', a: 'No. Escanean el QR con la cámara del celular y la carta se abre al instante en el navegador.' },
      { q: '¿La app de pedidos cobra comisión?', a: 'No. Es tu propia app: los pedidos llegan directo a tu cocina y no pagas comisión por cada pedido.' },
      { q: '¿En cuánto tiempo está lista la carta digital?', a: 'En pocos días, apenas tengamos tus platos, precios y fotos. Si no tienes fotos, podemos tomarlas.' },
    ],
    demoMessage: 'Hola FLOX, tengo un restaurante y quiero una demo gratis de carta digital o app de pedidos',
    cta: {
      title: '¿Listo para llenar más mesas?',
      text: 'Cuéntanos de tu restaurante y te mostramos una demo con tus propios platos.',
      message: 'Hola FLOX, tengo un restaurante en Cusco y quiero conversar sobre una carta digital, una web o una app para mi negocio',
    },
    seo: {
      title: 'Webs y apps para restaurantes en Cusco | FLOX',
      description: 'Carta digital con QR en varios idiomas, app de pedidos y delivery sin comisiones y reservas por WhatsApp para restaurantes de Cusco.',
    },
    suggested: ['carta', 'chatbot', 'maps'],
  },
  {
    slug: 'hoteles',
    hero: {
      eyebrow: 'Para hoteles, hostales y casas de huéspedes',
      title: 'Reservas directas, sin pagar comisión a las plataformas',
      lead: 'Una web propia donde tus huéspedes reservan directo por WhatsApp, un chatbot que responde en inglés y tu hotel bien ubicado en Google Maps.',
    },
    problems: [
      { icon: 'moneda', question: '¿Cada reserva por plataforma te deja menos ganancia?', solution: 'Web propia con reservas directas por WhatsApp, sin comisión por reserva.' },
      { icon: 'chat', question: '¿Los huéspedes escriben en inglés a medianoche?', solution: 'Chatbot bilingüe que responde precios y disponibilidad las 24 horas.' },
      { icon: 'mapa', question: '¿Tu hotel no aparece cuando buscan en Google Maps?', solution: 'Perfil de Google con fotos, reseñas y botón para reservar.' },
    ],
    services: [
      { id: 'webPlus', text: 'Habitaciones, galería, mapa y reservas, en español e inglés.' },
      { id: 'chatbot', text: 'Responde precios, horarios de llegada y cómo llegar, en el idioma del huésped.' },
      { id: 'maps', text: 'Fotos, reseñas y ubicación para que te elijan desde Google Maps.' },
    ],
    demo: {
      kind: 'site',
      slug: 'hotel',
      title: 'Mira una web de hotel con reservas directas',
      lead: 'El Hotel Killa Wasi es un hotel ficticio: recorre sus habitaciones y prueba reservar.',
    },
    faqs: [
      { q: '¿Puedo seguir usando Booking o Airbnb?', a: 'Sí. La web propia no las reemplaza: te ayuda a que más huéspedes reserven directo contigo, sin comisión.' },
      { q: '¿Cómo me llegan las reservas?', a: 'A tu WhatsApp, con fechas, habitación y número de huéspedes ordenados. Tú confirmas y coordinas el pago.' },
      { q: '¿La web está en inglés?', a: 'Sí, en español e inglés, con precios en soles y en dólares.' },
      { q: '¿Puedo cambiar los precios por temporada?', a: 'Sí. Los cambias desde un panel sencillo o nos escribes y lo hacemos por ti.' },
    ],
    demoMessage: 'Hola FLOX, tengo un hotel y quiero una demo gratis de una web con reservas directas',
    cta: {
      title: '¿Quieres más reservas directas?',
      text: 'Te mostramos cómo se vería la web de tu hotel, con tus habitaciones y tus precios.',
      message: 'Hola FLOX, tengo un hotel en Cusco y quiero conversar sobre una web con reservas directas para mi negocio',
    },
    seo: {
      title: 'Webs para hoteles y hostales en Cusco | FLOX',
      description: 'Web propia con reservas directas por WhatsApp y sin comisión, chatbot en inglés y perfil de Google Maps para hoteles y hostales de Cusco.',
    },
    suggested: ['webPlus', 'chatbot', 'maps'],
  },
  {
    slug: 'agencias-de-turismo',
    hero: {
      eyebrow: 'Para agencias de turismo y operadores',
      title: 'Vende tus tours directo, sin intermediarios',
      lead: 'Un catálogo de tours en varios idiomas, con calendario de salidas, carrito y reserva por WhatsApp, para que el turista reserve contigo en el momento.',
    },
    problems: [
      { icon: 'resultados', question: '¿El turista compara y termina reservando en otra agencia?', solution: 'Catálogo claro con precios, fotos e itinerario para que reserve en el momento.' },
      { icon: 'chat', question: '¿Respondes las mismas preguntas todo el día?', solution: 'Chatbot que responde horarios, precios y qué llevar, en español e inglés.' },
      { icon: 'calendario', question: '¿Llevas las salidas en un cuaderno?', solution: 'Calendario de salidas con cupos y reservas ordenadas en tu WhatsApp.' },
    ],
    services: [
      { id: 'webPlus', text: 'Catálogo de tours con filtros, calendario de salidas y carrito, en español e inglés.' },
      { id: 'chatbot', text: 'Responde a turistas de todo el mundo a cualquier hora, en su idioma.' },
      { id: 'maps', text: 'Tu agencia en Google Maps, con reseñas de tus viajeros.' },
    ],
    demo: {
      kind: 'site',
      slug: 'agencia',
      title: 'Mira una web de agencia con reservas',
      lead: 'Andes Ruta Travel es una agencia ficticia: busca un tour, elige la fecha y prueba reservar.',
    },
    faqs: [
      { q: '¿Puedo cobrar en línea?', a: 'Sí. Podemos conectar la pasarela de pago que uses (Izipay, Niubiz, Mercado Pago o PayPal) o dejar la reserva por WhatsApp, como en la demo.' },
      { q: '¿Puedo actualizar mis tours y salidas?', a: 'Sí. Cambias precios, fotos, itinerarios y fechas agotadas desde un panel sencillo.' },
      { q: '¿Funciona en inglés?', a: 'Sí. La web está en español e inglés, con precios en soles y en dólares.' },
    ],
    demoMessage: 'Hola FLOX, tengo una agencia de turismo y quiero una demo gratis de una web con reservas',
    cta: {
      title: '¿Listo para vender tus tours en línea?',
      text: 'Te mostramos una demo con tus tours, tus fotos y tus precios.',
      message: 'Hola FLOX, tengo una agencia de turismo en Cusco y quiero conversar sobre una web con reservas para mis tours',
    },
    seo: {
      title: 'Webs para agencias de turismo en Cusco | FLOX',
      description: 'Webs bilingües para agencias de turismo de Cusco: catálogo de tours, calendario de salidas, carrito y reservas por WhatsApp, con chatbot en inglés.',
    },
    suggested: ['webPlus', 'chatbot'],
  },
  {
    slug: 'tiendas',
    hero: {
      eyebrow: 'Para tiendas, minimarkets y distribuidoras',
      title: 'Vende también por internet y nunca te quedes sin stock',
      lead: 'Tienda online con pedidos por WhatsApp y una app de inventario con alertas, para vender más y no perder ventas por productos agotados.',
    },
    problems: [
      { icon: 'tienda', question: '¿Te preguntan todo el día si tienes un producto?', solution: 'Tienda online con catálogo y precios: eligen y te piden directo.' },
      { icon: 'alerta', question: '¿Te enteras tarde de que algo se acabó?', solution: 'App de inventario que avisa cuando un producto llega al mínimo.' },
      { icon: 'resultados', question: '¿Haces el inventario a mano en un cuaderno?', solution: 'Entradas y salidas desde el celular, y reportes en Excel.' },
    ],
    services: [
      { id: 'tienda', text: 'Catálogo con carrito y pedidos por WhatsApp, o pago en línea.' },
      { id: 'app', text: 'Inventario con alertas, escáner de códigos y reportes, como Stock Andino.' },
      { id: 'maps', text: 'Que te encuentren cuando buscan una tienda cerca.' },
      { id: 'web1', text: 'Tu tienda en Google, con horarios, ubicación y WhatsApp.' },
    ],
    demo: {
      kind: 'app',
      slug: 'app-inventario',
      title: 'Prueba una app de inventario',
      lead: 'Stock Andino es una app de ejemplo para un minimarket ficticio. Registra una salida y mira cómo cambian las alertas.',
    },
    faqs: [
      { q: '¿Necesito una pasarela de pago?', a: 'No es obligatorio: puedes recibir pedidos por WhatsApp y cobrar con Yape o en efectivo. Si quieres cobrar en línea, la conectamos.' },
      { q: '¿La app de inventario funciona en el celular?', a: 'Sí, en celular y en tablet. Registras entradas y salidas y descargas reportes en Excel.' },
      { q: '¿Tengo que subir todos mis productos?', a: 'Te ayudamos a cargar tu catálogo al inicio y después lo actualizas tú.' },
    ],
    demoMessage: 'Hola FLOX, tengo una tienda y quiero una demo gratis de tienda online o app de inventario',
    cta: {
      title: '¿Listo para vender más y controlar tu stock?',
      text: 'Cuéntanos qué vendes y te mostramos cómo se vería tu tienda o tu inventario.',
      message: 'Hola FLOX, tengo una tienda en Cusco y quiero conversar sobre una tienda online o una app de inventario para mi negocio',
    },
    seo: {
      title: 'Tiendas online y apps de inventario en Cusco | FLOX',
      description: 'Tienda online con pedidos por WhatsApp y app de inventario con alertas de stock y reportes en Excel para tiendas y minimarkets de Cusco.',
    },
    suggested: ['tienda', 'maps'],
  },
  {
    slug: 'gimnasios',
    hero: {
      eyebrow: 'Para gimnasios, estudios y academias',
      title: 'Socios que vuelven, clases que se llenan',
      lead: 'Una app con la membresía en el celular, reserva de clases y rutinas, y recordatorios por WhatsApp para que tus socios no abandonen.',
    },
    problems: [
      { icon: 'resultados', question: '¿Socios que dejan de venir y no renuevan?', solution: 'App con racha, logros y recordatorios que los motivan a volver.' },
      { icon: 'calendario', question: '¿Clases llenas un día y vacías otro?', solution: 'Reserva de clases con cupos y lista de espera desde el celular.' },
      { icon: 'reloj', question: '¿Llevas las membresías a mano?', solution: 'Membresías con fecha de vencimiento y aviso para renovar.' },
    ],
    services: [
      { id: 'app', text: 'Membresía con QR, reserva de clases y rutinas, como Puma Fit.' },
      { id: 'chatbot', text: 'Responde horarios y precios, y avisa cuándo vence la membresía.' },
      { id: 'citas', text: 'Reservas de entrenamientos personales con recordatorio.' },
      { id: 'maps', text: 'Que te encuentren cuando buscan un gimnasio cerca.' },
    ],
    demo: {
      kind: 'app',
      slug: 'app-gym',
      title: 'Prueba una app de gimnasio',
      lead: 'Puma Fit es una app de ejemplo para un gimnasio ficticio. Reserva una clase y marca tu rutina.',
    },
    faqs: [
      { q: '¿Mis socios la pueden descargar en Play Store y App Store?', a: 'Sí. La publicamos con el nombre y el logo de tu gimnasio, para Android e iPhone.' },
      { q: '¿Cuánto cuesta la app?', a: 'Depende de las funciones que necesites. Te damos una cotización clara después de conocer tu gimnasio.' },
      { q: '¿Puedo empezar con algo más sencillo?', a: 'Sí. Puedes empezar con reservas de clases y recordatorios por WhatsApp, y sumar la app después.' },
    ],
    demoMessage: 'Hola FLOX, tengo un gimnasio y quiero una demo gratis de una app para mis socios',
    cta: {
      title: '¿Quieres una app para tu gimnasio?',
      text: 'La hacemos con tu marca, tus planes y tus clases.',
      message: 'Hola FLOX, tengo un gimnasio en Cusco y quiero conversar sobre una app para mis socios',
    },
    seo: {
      title: 'Apps para gimnasios en Cusco | FLOX',
      description: 'App para gimnasios con membresía y QR, reserva de clases, rutinas y recordatorios por WhatsApp. Para Android e iPhone, hecha en Cusco.',
    },
    suggested: ['app', 'chatbot'],
  },
  {
    slug: 'consultorios',
    hero: {
      eyebrow: 'Para consultorios médicos y dentales, barberías y spas',
      title: 'Agenda llena y menos pacientes que faltan',
      lead: 'Citas por WhatsApp a cualquier hora y recordatorios automáticos, para que tu agenda se llene sola y nadie se olvide de su cita.',
    },
    problems: [
      { icon: 'chat', question: '¿Pasas el día contestando mensajes para dar citas?', solution: 'Chatbot que agenda citas por WhatsApp a cualquier hora.' },
      { icon: 'reloj', question: '¿Pacientes que no llegan y no avisan?', solution: 'Recordatorio automático un día antes, para confirmar o cambiar la cita.' },
      { icon: 'mapa', question: '¿Los nuevos pacientes no te encuentran?', solution: 'Perfil de Google Maps con reseñas y botón para pedir cita.' },
    ],
    services: [
      { id: 'citas', text: 'Agenda en línea con tus horarios y recordatorios por WhatsApp.' },
      { id: 'chatbot', text: 'Responde precios y ubicación, y agenda la cita en la misma conversación.' },
      { id: 'web1', text: 'Tus servicios, tu equipo y un botón para pedir cita.' },
      { id: 'maps', text: 'Reseñas y ubicación para que te elijan desde Google Maps.' },
    ],
    demo: {
      kind: 'chat',
      script: 'consultorio',
      title: 'Así se agenda una cita por WhatsApp',
      lead: 'Una conversación de ejemplo con un consultorio dental ficticio: el chatbot da la cita y después envía el recordatorio.',
    },
    faqs: [
      { q: '¿Los recordatorios se envían solos?', a: 'Sí. Un día antes, el paciente recibe un WhatsApp con la hora de su cita y puede confirmarla o pedir un cambio.' },
      { q: '¿Sirve para barberías y spas?', a: 'Sí. Funciona para cualquier negocio que trabaje con citas: consultorios, dentistas, barberías, spas y más.' },
      { q: '¿Puedo bloquear horarios o días libres?', a: 'Sí. Tú decides qué horarios atiendes y qué días no.' },
    ],
    demoMessage: 'Hola FLOX, tengo un negocio con citas (consultorio, barbería o spa) y quiero una demo gratis de citas por WhatsApp',
    cta: {
      title: '¿Listo para que tu agenda se llene sola?',
      text: 'Te mostramos una demo con tus servicios y tus horarios.',
      message: 'Hola FLOX, tengo un consultorio (o un negocio con citas) en Cusco y quiero conversar sobre citas y recordatorios por WhatsApp',
    },
    seo: {
      title: 'Citas por WhatsApp para consultorios en Cusco | FLOX',
      description: 'Citas por WhatsApp a cualquier hora y recordatorios automáticos para consultorios médicos y dentales, barberías y spas de Cusco.',
    },
    suggested: ['citas', 'chatbot', 'maps'],
  },
]

// Cada rubro con sus datos del menú (nombre, ícono…) y su contenido
export const rubros = content.map((r) => ({ ...rubrosMenu.find((m) => m.slug === r.slug), ...r }))

export const rubroBySlug = Object.fromEntries(rubros.map((r) => [r.slug, r]))

// Enlace al cotizador con el rubro ya elegido
export const quoteHref = (rubro) => `/cotizar?rubro=${rubro.slug}`

// Textos comunes de las páginas de rubro y del selector del inicio
export const solucionesUi = {
  navLabel: 'Soluciones',
  navAll: 'Ver precios',
  heroCta: 'Pide tu demo gratis',
  quoteCta: 'Cotiza tu proyecto',
  problemsTitle: 'Lo que más les pasa a los negocios como el tuyo',
  problemsEyebrow: 'Problemas que resolvemos',
  servicesEyebrow: 'Soluciones FLOX',
  servicesTitle: 'Lo que podemos hacer por tu negocio',
  demoEyebrow: 'Demo',
  openDemo: 'Ver la demo completa',
  faqEyebrow: 'Preguntas frecuentes',
  faqTitle: 'Lo que nos preguntan',
  quoteTitle: '¿Cuánto costaría?',
  quoteText: 'Arma tu proyecto en el cotizador y mira un precio referencial al instante.',
  ctaButton: 'Escríbenos por WhatsApp',
}
