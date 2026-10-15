// Proyectos demo de FLOX (negocios ficticios).
// status: 'listo' | 'construccion' · preview: 'phone' (carta en celular) | 'browser' (navegador) | 'app' (app móvil)
// link: a dónde lleva la tarjeta si el proyecto ya está listo (si no, a /proyectos/:slug)

export const projectsPage = {
  title: 'Proyectos',
  lead: 'Ejemplos de lo que podemos hacer para tu negocio. Son proyectos demo con negocios ficticios: el tuyo puede ser el siguiente.',
  filtersLabel: 'Filtrar proyectos',
  demoLabel: 'Proyecto demo',
  includesLabel: 'Lo que incluye la web de',
  soonLabel: 'Muy pronto',
  view: 'Ver proyecto',
  empty: 'Todavía no hay proyectos en esta categoría. ¡El tuyo puede ser el primero!',
  cta: {
    title: '¿Quieres que tu negocio sea el próximo?',
    button: 'Escríbenos',
    message: 'Hola FLOX, vi sus proyectos y quiero que mi negocio sea el próximo',
  },
  strip: {
    eyebrow: 'Proyectos',
    title: 'Mira nuestros proyectos',
    button: 'Ver todos los proyectos',
  },
  building: {
    title: 'Página en construcción',
    text: 'Estamos terminando este proyecto demo. Muy pronto podrás verlo completo aquí.',
    back: 'Volver a proyectos',
    demo: 'Ver la demo',
  },
}

export const projectCategories = [
  { id: 'todos', label: 'Todos' },
  { id: 'restaurantes', label: 'Restaurantes' },
  { id: 'hoteles', label: 'Hoteles' },
  { id: 'turismo', label: 'Turismo' },
  { id: 'apps', label: 'Apps' },
]

export const projects = [
  {
    slug: 'picanteria-qhapaq',
    name: 'Picantería Qhapaq',
    type: 'Carta digital con QR',
    category: 'restaurantes',
    description: 'Carta digital en español e inglés, con fotos de cada plato, pedido en la mesa y botón para llamar al mozo.',
    services: ['Carta digital', 'Código QR', 'Español e inglés'],
    status: 'listo',
    link: '/demo',
    preview: 'phone',
    colors: { primary: '#7A2812', secondary: '#A63A1C', accent: '#F2A900', bg: '#FFF8F0', tint: '#F9D9B2' },
  },
  {
    slug: 'hotel',
    name: 'Hotel Killa Wasi',
    type: 'Web para hotel',
    category: 'hoteles',
    description: 'Web con habitaciones, fotos, ubicación en el mapa y reservas directas por WhatsApp, sin comisiones.',
    services: ['Página web', 'Reservas por WhatsApp', 'Google Maps'],
    status: 'listo',
    preview: 'browser',
    url: 'killawasi.pe',
    colors: { primary: '#1F2A44', secondary: '#34446B', accent: '#E9C46A', bg: '#F4F1EA', tint: '#D9E0F0' },
  },
  {
    slug: 'agencia',
    name: 'Andes Ruta Travel',
    type: 'Web completa para agencia de turismo',
    category: 'turismo',
    description: 'Web completa en español e inglés: catálogo de tours con filtros, calendario de salidas, carrito y reserva en línea confirmada por WhatsApp.',
    services: ['Web bilingüe', 'Catálogo de tours', 'Reservas en línea'],
    status: 'listo',
    preview: 'browser',
    url: 'andesruta.travel',
    // Lo que incluye esta web (se muestra debajo de su tarjeta en Proyectos)
    highlights: ['Catálogo con filtros', 'Calendario de salidas', 'Carrito', 'Reserva en 3 pasos', 'Bilingüe', 'Precios en USD y soles'],
    colors: { primary: '#0B6E4F', secondary: '#139A6E', accent: '#F28C28', bg: '#EEF6F1', tint: '#CFE8DB' },
  },
  // FLOX Apps: apps móviles de ejemplo
  {
    slug: 'app-gym',
    name: 'Puma Fit',
    type: 'App para gimnasio',
    category: 'apps',
    description: 'App para socios de un gimnasio: membresía con QR, reserva de clases, rutina con temporizador y progreso. Pruébala con el dedo.',
    services: ['App móvil', 'Android e iPhone', 'Reservas de clases'],
    status: 'listo',
    preview: 'app',
    highlights: ['Membresía con QR', 'Reserva de clases', 'Rutina con temporizador', 'Progreso y logros', 'Modo claro y oscuro'],
    colors: { primary: '#0F0F10', secondary: '#2A2A2E', accent: '#B6F24A', bg: '#F1F5EA', tint: '#DDEFC0' },
  },
  {
    slug: 'app-restaurante',
    name: 'Qhapaq Pedidos',
    type: 'App de pedidos y delivery',
    category: 'apps',
    description: 'Dos apps conectadas: el cliente pide (delivery, recojo o mesa) y el pedido llega al instante al panel de cocina.',
    services: ['App del cliente', 'Panel de cocina', 'Delivery'],
    status: 'listo',
    highlights: ['Pedidos en tiempo real', 'Panel de cocina', 'Seguimiento con mapa', 'Delivery, recojo o mesa', 'Historial y volver a pedir'],
    preview: 'app',
    colors: { primary: '#A63A1E', secondary: '#3B2418', accent: '#5C7A3A', bg: '#FFF4E2', tint: '#F6E6CB' },
  },
  {
    slug: 'app-inventario',
    name: 'Stock Andino',
    type: 'App de inventario',
    category: 'apps',
    description: 'App de inventario para un minimarket: entradas y salidas, alertas de stock, pedidos al proveedor y reportes en Excel.',
    services: ['App de gestión', 'Tablet y celular', 'Reportes en Excel'],
    status: 'listo',
    highlights: ['Panel con cifras', 'Escáner de códigos', 'Alertas de stock', 'Pedido al proveedor', 'Reporte CSV para Excel'],
    preview: 'app',
    colors: { primary: '#0E4C5A', secondary: '#1B6F80', accent: '#F2A93B', bg: '#F1F4F5', tint: '#D6E7EA' },
  },
]

// A dónde lleva cada proyecto
export function projectHref(project) {
  return project.status === 'listo' && project.link ? project.link : `/proyectos/${project.slug}`
}
