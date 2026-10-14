// Datos del Hotel Killa Wasi (negocio ficticio, proyecto demo de FLOX).
// Todo el contenido del sitio vive aquí, en español (es) e inglés (en).
//
// IMÁGENES: cada imagen tiene `photo` (nombre de archivo) e `illustration` (respaldo en SVG).
// Para usar fotos reales, copia el archivo con ese nombre en src/projects/hotel/fotos/
// y se usará solo, sin tocar los componentes. Si no existe, se muestra la ilustración.

export const USD_TO_PEN = 3.75 // tipo de cambio fijo de ejemplo
export const MAX_GUESTS = 4

// Opciones de los selectores de idioma y moneda
export const LANG_OPTIONS = [
  { id: 'es', label: 'ES', name: 'Español', lang: 'es' },
  { id: 'en', label: 'EN', name: 'English', lang: 'en' },
]
export const CURRENCY_OPTIONS = [
  { id: 'USD', label: 'US$', name: 'USD' },
  { id: 'PEN', label: 'S/', name: 'PEN (soles)' },
]

export const hotel = {
  name: 'Hotel Killa Wasi',
  short: 'Killa Wasi',
  place: 'San Blas, Cusco',
  // Datos de contacto de EJEMPLO (no son reales)
  contact: {
    phone: '+51 900 000 000',
    email: 'reservas@killawasi.pe',
  },
  socials: ['facebook', 'instagram', 'tripadvisor'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=San+Blas+Cusco',
}

// ─── Textos de la interfaz ───────────────────────────────────
export const text = {
  es: {
    locale: 'es-PE',
    nav: {
      rooms: 'Habitaciones',
      experiences: 'Experiencias',
      gallery: 'Galería',
      location: 'Ubicación',
      book: 'Reservar',
      home: 'Hotel Killa Wasi, ir al inicio',
      main: 'Menú del hotel',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      language: 'Idioma',
      currency: 'Moneda',
    },
    hero: {
      eyebrow: 'Hotel boutique · San Blas, Cusco',
      title: 'Duerme bajo la luna de Cusco',
      lead: 'Un refugio colonial en el barrio de los artesanos, a pasos de la Plaza de Armas.',
    },
    search: {
      label: 'Buscar disponibilidad',
      checkIn: 'Llegada',
      checkOut: 'Salida',
      guests: 'Huéspedes',
      guestsOption: (n) => `${n} ${n === 1 ? 'huésped' : 'huéspedes'}`,
      button: 'Ver disponibilidad',
      searching: 'Buscando…',
    },
    errors: {
      missing: 'Elige las fechas de llegada y salida.',
      past: 'La llegada no puede ser una fecha pasada.',
      order: 'La salida debe ser al menos un día después de la llegada.',
      capacity: (n) => `Esta habitación es para hasta ${n} ${n === 1 ? 'huésped' : 'huéspedes'}. Ajustamos el número por ti.`,
      name: 'Escribe tu nombre para la reserva.',
      country: 'Cuéntanos desde qué país nos visitas.',
    },
    rooms: {
      eyebrow: 'Habitaciones',
      title: 'Elige tu habitación',
      lead: 'Todas con calefacción, wifi y desayuno andino incluido.',
      perNight: 'por noche',
      upTo: (n) => `Hasta ${n} ${n === 1 ? 'huésped' : 'huéspedes'}`,
      nights: (n) => `${n} ${n === 1 ? 'noche' : 'noches'}`,
      total: 'Total',
      summary: (nights, range, guests) => `${nights} · ${range} · ${guests}`,
      changeDates: 'Cambiar fechas',
      tooSmall: (n) => `Para ${n} huéspedes te recomendamos una habitación más grande.`,
      book: 'Reservar esta habitación',
    },
    booking: {
      title: 'Tu reserva',
      dates: 'Fechas',
      nights: 'Noches',
      guests: 'Huéspedes',
      total: 'Total',
      approx: 'Aprox.',
      name: 'Nombre completo',
      namePlaceholder: 'Ej.: María Quispe',
      country: 'País',
      countryPlaceholder: 'Ej.: Perú',
      confirm: 'Confirmar por WhatsApp',
      note: 'Te responderemos por WhatsApp para confirmar la disponibilidad. No se cobra nada ahora.',
      close: 'Cerrar',
      less: 'Quitar un huésped',
      more: 'Agregar un huésped',
    },
    message: {
      greeting: 'Hola, quiero reservar en Hotel Killa Wasi:',
      room: 'Habitación',
      checkIn: 'Llegada',
      checkOut: 'Salida',
      nights: 'Noches',
      guests: 'Huéspedes',
      total: 'Total',
      name: 'Nombre',
      country: 'País',
      footer: '(Reserva enviada desde la web demo de FLOX)',
    },
    experiences: {
      eyebrow: 'Experiencias',
      title: 'Más que una noche de hotel',
    },
    gallery: {
      eyebrow: 'Galería',
      title: 'Así se vive Killa Wasi',
      open: 'Ampliar imagen',
      prev: 'Imagen anterior',
      next: 'Imagen siguiente',
      close: 'Cerrar',
      counter: (i, n) => `${i} de ${n}`,
    },
    location: {
      eyebrow: 'Ubicación',
      title: 'En el corazón de San Blas',
      text: 'Calles empedradas, talleres de artesanos y miradores. Todo Cusco a una caminata de distancia.',
      address: 'Cuesta de San Blas, Cusco · dirección de ejemplo',
      directions: 'Cómo llegar',
      mapLabel: 'Mapa ilustrado de San Blas con la ubicación del hotel',
      walk: 'caminando',
      car: 'en auto',
    },
    footer: {
      tagline: 'Hotel boutique en San Blas, Cusco.',
      contact: 'Contacto',
      follow: 'Síguenos',
      exampleNote: 'Datos y redes de ejemplo',
      rights: 'Hotel Killa Wasi · Negocio ficticio',
      madeBy: 'Web hecha por',
    },
    countries: ['Perú', 'Estados Unidos', 'Brasil', 'Argentina', 'Chile', 'Colombia', 'México', 'España', 'Francia', 'Alemania', 'Reino Unido', 'Canadá', 'Australia'],
  },
  en: {
    locale: 'en-US',
    nav: {
      rooms: 'Rooms',
      experiences: 'Experiences',
      gallery: 'Gallery',
      location: 'Location',
      book: 'Book now',
      home: 'Hotel Killa Wasi, go to top',
      main: 'Hotel menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      language: 'Language',
      currency: 'Currency',
    },
    hero: {
      eyebrow: 'Boutique hotel · San Blas, Cusco',
      title: 'Sleep under the Cusco moon',
      lead: 'A colonial hideaway in the artisans’ quarter, steps from the Plaza de Armas.',
    },
    search: {
      label: 'Check availability',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      guests: 'Guests',
      guestsOption: (n) => `${n} ${n === 1 ? 'guest' : 'guests'}`,
      button: 'Check availability',
      searching: 'Searching…',
    },
    errors: {
      missing: 'Choose your check-in and check-out dates.',
      past: 'Check-in can’t be a past date.',
      order: 'Check-out must be at least one day after check-in.',
      capacity: (n) => `This room fits up to ${n} ${n === 1 ? 'guest' : 'guests'}. We adjusted it for you.`,
      name: 'Please enter your name for the booking.',
      country: 'Tell us which country you’re visiting from.',
    },
    rooms: {
      eyebrow: 'Rooms',
      title: 'Choose your room',
      lead: 'All with heating, wifi and Andean breakfast included.',
      perNight: 'per night',
      upTo: (n) => `Up to ${n} ${n === 1 ? 'guest' : 'guests'}`,
      nights: (n) => `${n} ${n === 1 ? 'night' : 'nights'}`,
      total: 'Total',
      summary: (nights, range, guests) => `${nights} · ${range} · ${guests}`,
      changeDates: 'Change dates',
      tooSmall: (n) => `For ${n} guests we recommend a larger room.`,
      book: 'Book this room',
    },
    booking: {
      title: 'Your booking',
      dates: 'Dates',
      nights: 'Nights',
      guests: 'Guests',
      total: 'Total',
      approx: 'Approx.',
      name: 'Full name',
      namePlaceholder: 'e.g. Sarah Miller',
      country: 'Country',
      countryPlaceholder: 'e.g. United States',
      confirm: 'Confirm on WhatsApp',
      note: 'We’ll reply on WhatsApp to confirm availability. Nothing is charged now.',
      close: 'Close',
      less: 'Remove a guest',
      more: 'Add a guest',
    },
    message: {
      greeting: 'Hi! I’d like to book at Hotel Killa Wasi:',
      room: 'Room',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      nights: 'Nights',
      guests: 'Guests',
      total: 'Total',
      name: 'Name',
      country: 'Country',
      footer: '(Booking sent from the FLOX demo website)',
    },
    experiences: {
      eyebrow: 'Experiences',
      title: 'More than a night’s stay',
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Life at Killa Wasi',
      open: 'Enlarge image',
      prev: 'Previous image',
      next: 'Next image',
      close: 'Close',
      counter: (i, n) => `${i} of ${n}`,
    },
    location: {
      eyebrow: 'Location',
      title: 'In the heart of San Blas',
      text: 'Cobblestone streets, artisan workshops and viewpoints. All of Cusco within walking distance.',
      address: 'Cuesta de San Blas, Cusco · sample address',
      directions: 'Get directions',
      mapLabel: 'Illustrated map of San Blas showing the hotel',
      walk: 'walking',
      car: 'by car',
    },
    footer: {
      tagline: 'Boutique hotel in San Blas, Cusco.',
      contact: 'Contact',
      follow: 'Follow us',
      exampleNote: 'Sample contact details and social media',
      rights: 'Hotel Killa Wasi · Fictional business',
      madeBy: 'Website by',
    },
    countries: ['Peru', 'United States', 'Brazil', 'Argentina', 'Chile', 'Colombia', 'Mexico', 'Spain', 'France', 'Germany', 'United Kingdom', 'Canada', 'Australia'],
  },
}

// ─── Habitaciones (precios por noche en USD) ─────────────────
export const rooms = [
  {
    id: 'simple',
    name: { es: 'Simple', en: 'Single' },
    description: { es: 'Acogedora y luminosa, ideal para viajeros solos.', en: 'Cozy and bright, ideal for solo travelers.' },
    capacity: 1,
    size: 16,
    price: 55,
    amenities: ['bed', 'shower', 'wifi', 'heating'],
    image: {
      photo: 'habitacion-simple.jpg',
      illustration: 'room-single',
      alt: { es: 'Habitación simple con ventana inca', en: 'Single room with an Inca window' },
    },
  },
  {
    id: 'matrimonial',
    name: { es: 'Matrimonial', en: 'Queen room' },
    description: { es: 'Cama queen, edredón de alpaca y luz cálida.', en: 'Queen bed, alpaca duvet and warm light.' },
    capacity: 2,
    size: 22,
    price: 78,
    amenities: ['queen', 'shower', 'wifi', 'heating'],
    image: {
      photo: 'habitacion-matrimonial.jpg',
      illustration: 'room-queen',
      alt: { es: 'Habitación matrimonial con cama queen', en: 'Queen room with a large bed' },
    },
  },
  {
    id: 'doble-vista',
    name: { es: 'Doble con vista', en: 'Twin with view' },
    description: { es: 'Dos camas y ventanal a los techos de San Blas.', en: 'Two beds and a large window over the San Blas rooftops.' },
    capacity: 3,
    size: 26,
    price: 98,
    amenities: ['twin', 'view', 'wifi', 'heating'],
    image: {
      photo: 'habitacion-doble-vista.jpg',
      illustration: 'room-twin',
      alt: { es: 'Habitación doble con ventanal a la ciudad', en: 'Twin room with a city-view window' },
    },
  },
  {
    id: 'suite-killa',
    name: { es: 'Suite Killa', en: 'Killa Suite' },
    description: { es: 'Nuestra suite con sala, tina y balcón para ver la luna.', en: 'Our suite with a lounge, bathtub and a balcony to watch the moon.' },
    capacity: 4,
    size: 40,
    price: 145,
    amenities: ['king', 'tub', 'balcony', 'heating'],
    image: {
      photo: 'suite-killa.jpg',
      illustration: 'room-suite',
      alt: { es: 'Suite Killa con sala y balcón', en: 'Killa Suite with lounge and balcony' },
    },
  },
]

export const amenityLabels = {
  bed: { es: 'Cama de 1½ plazas', en: 'Single bed' },
  queen: { es: 'Cama queen', en: 'Queen bed' },
  twin: { es: '2 camas', en: '2 beds' },
  king: { es: 'Cama king', en: 'King bed' },
  shower: { es: 'Ducha caliente', en: 'Hot shower' },
  tub: { es: 'Tina', en: 'Bathtub' },
  wifi: { es: 'Wifi', en: 'Wifi' },
  heating: { es: 'Calefacción', en: 'Heating' },
  view: { es: 'Vista a la ciudad', en: 'City view' },
  balcony: { es: 'Balcón', en: 'Balcony' },
}

// ─── Experiencias ────────────────────────────────────────────
export const experiences = [
  {
    id: 'desayuno',
    title: { es: 'Desayuno andino', en: 'Andean breakfast' },
    text: { es: 'Pan chuta, frutas del valle, quinua y café de la selva cusqueña.', en: 'Chuta bread, valley fruit, quinoa and coffee from the Cusco jungle.' },
    image: { photo: 'experiencia-desayuno.jpg', illustration: 'breakfast', alt: { es: 'Desayuno andino servido en la mesa', en: 'Andean breakfast on the table' } },
  },
  {
    id: 'terraza',
    title: { es: 'Terraza con vista', en: 'Rooftop terrace' },
    text: { es: 'Atardeceres sobre los techos de teja y la ciudad iluminada de noche.', en: 'Sunsets over the tiled roofs and the city lit up at night.' },
    image: { photo: 'experiencia-terraza.jpg', illustration: 'terrace', alt: { es: 'Terraza con vista a los techos de Cusco', en: 'Terrace overlooking the Cusco rooftops' } },
  },
  {
    id: 'traslado',
    title: { es: 'Traslado desde el aeropuerto', en: 'Airport transfer' },
    text: { es: 'Te recogemos en el aeropuerto y te llevamos directo al hotel.', en: 'We pick you up at the airport and take you straight to the hotel.' },
    image: { photo: 'experiencia-traslado.jpg', illustration: 'transfer', alt: { es: 'Camioneta del hotel camino a Cusco', en: 'Hotel van on the way to Cusco' } },
  },
  {
    id: 'mate',
    title: { es: 'Mate de coca 24 horas', en: '24-hour coca tea' },
    text: { es: 'Siempre listo en la recepción para ayudarte con el soroche.', en: 'Always ready at the front desk to help with altitude sickness.' },
    image: { photo: 'experiencia-mate.jpg', illustration: 'tea', alt: { es: 'Taza de mate de coca humeante', en: 'Steaming cup of coca tea' } },
  },
]

// ─── Galería ─────────────────────────────────────────────────
export const gallery = [
  { photo: 'galeria-habitacion.jpg', illustration: 'room-queen', alt: { es: 'Habitación', en: 'Bedroom' } },
  { photo: 'galeria-terraza.jpg', illustration: 'terrace', alt: { es: 'Terraza', en: 'Terrace' } },
  { photo: 'galeria-desayuno.jpg', illustration: 'breakfast', alt: { es: 'Desayuno', en: 'Breakfast' } },
  { photo: 'galeria-patio.jpg', illustration: 'patio', alt: { es: 'Patio colonial', en: 'Colonial courtyard' } },
  { photo: 'galeria-recepcion.jpg', illustration: 'reception', alt: { es: 'Recepción', en: 'Reception' } },
  { photo: 'galeria-vista-nocturna.jpg', illustration: 'night', alt: { es: 'Vista nocturna', en: 'Night view' } },
]

// ─── Ubicación (distancias de ejemplo) ───────────────────────
export const distances = [
  { place: { es: 'Plaza de Armas', en: 'Plaza de Armas' }, minutes: 7, mode: 'walk' },
  { place: { es: 'Mirador de San Blas', en: 'San Blas viewpoint' }, minutes: 2, mode: 'walk' },
  { place: { es: 'Mercado San Pedro', en: 'San Pedro Market' }, minutes: 18, mode: 'walk' },
  { place: { es: 'Aeropuerto', en: 'Airport' }, minutes: 20, mode: 'car' },
]
