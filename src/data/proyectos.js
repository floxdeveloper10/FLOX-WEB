// Proyectos demo de FLOX (negocios ficticios).
// status: 'listo' | 'construccion' · preview: 'phone' (celular) | 'browser' (navegador)
// link: a dónde lleva la tarjeta si el proyecto ya está listo (si no, a /proyectos/:slug)

export const projectsPage = {
  title: 'Proyectos',
  lead: 'Ejemplos de lo que podemos hacer para tu negocio. Son proyectos demo con negocios ficticios: el tuyo puede ser el siguiente.',
  filtersLabel: 'Filtrar proyectos',
  demoLabel: 'Proyecto demo',
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
    description: 'Web en varios idiomas con tours, precios y galería, y un chatbot que responde a los turistas las 24 horas.',
    services: ['Web en varios idiomas', 'Chatbot de WhatsApp', 'Catálogo de tours'],
    status: 'construccion',
    preview: 'browser',
    url: 'andesruta.travel',
    colors: { primary: '#0B6E4F', secondary: '#139A6E', accent: '#F28C28', bg: '#EEF6F1', tint: '#CFE8DB' },
  },
]

// A dónde lleva cada proyecto
export function projectHref(project) {
  return project.status === 'listo' && project.link ? project.link : `/proyectos/${project.slug}`
}
