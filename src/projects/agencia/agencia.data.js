// Datos de Andes Ruta Travel (agencia ficticia, proyecto demo de FLOX).
// Todo en español (es) e inglés (en). Precios por persona en USD, de EJEMPLO.
//
// IMÁGENES: cada tour tiene `photo` (nombre de archivo) e `illustration` (respaldo en SVG).
// Para usar fotos reales, copia el archivo con ese nombre en src/projects/agencia/fotos/
// (la extensión no importa) y se usará solo. Si no existe, se muestra la ilustración.

export const USD_TO_PEN = 3.75 // tipo de cambio fijo de ejemplo
export const MAX_PEOPLE = 12

export const agency = {
  name: 'Andes Ruta Travel',
  // Datos de contacto de EJEMPLO (no son reales)
  contact: {
    phone: '+51 900 000 000',
    email: 'hola@andesruta.travel',
    address: { es: 'Calle Plateros 000, Cusco · dirección de ejemplo', en: 'Calle Plateros 000, Cusco · sample address' },
  },
  hours: [
    { days: { es: 'Lunes a sábado', en: 'Monday to Saturday' }, time: '8:00 – 20:00' },
    { days: { es: 'Domingo', en: 'Sunday' }, time: '9:00 – 13:00' },
  ],
  socials: ['facebook', 'instagram', 'tiktok', 'youtube'],
}

export const LANG_OPTIONS = [
  { id: 'es', label: 'ES', name: 'Español', lang: 'es' },
  { id: 'en', label: 'EN', name: 'English', lang: 'en' },
]
export const CURRENCY_OPTIONS = [
  { id: 'USD', label: 'USD', name: 'Dólares (USD)' },
  { id: 'PEN', label: 'PEN', name: 'Soles (PEN)' },
]

// ─── Catálogo ────────────────────────────────────────────────
export const categories = [
  { id: 'aventura', label: { es: 'Aventura', en: 'Adventure' } },
  { id: 'cultural', label: { es: 'Cultural', en: 'Cultural' } },
  { id: 'naturaleza', label: { es: 'Naturaleza', en: 'Nature' } },
  { id: 'mistico', label: { es: 'Místico', en: 'Mystic' } },
]

export const difficulties = [
  { id: 'facil', level: 1, label: { es: 'Fácil', en: 'Easy' } },
  { id: 'moderada', level: 2, label: { es: 'Moderada', en: 'Moderate' } },
  { id: 'exigente', level: 3, label: { es: 'Exigente', en: 'Challenging' } },
]

export const durations = [
  { id: '1dia', label: { es: '1 día', en: '1 day' } },
  { id: 'varios', label: { es: 'Varios días', en: 'Multi-day' } },
]

export const sorts = [
  { id: 'recomendados', label: { es: 'Recomendados', en: 'Recommended' } },
  { id: 'precio-asc', label: { es: 'Menor precio', en: 'Lowest price' } },
  { id: 'precio-desc', label: { es: 'Mayor precio', en: 'Highest price' } },
  { id: 'duracion', label: { es: 'Duración', en: 'Duration' } },
]

// días: 0 domingo … 6 sábado
const DAILY = [0, 1, 2, 3, 4, 5, 6]

/*
 * Cada tour:
 * - duration: { days, hours } (hours = horas del tour cuando es de un día)
 * - departures: días de la semana con salida
 * - itinerary: [{ time | day, title: {es,en}, text: {es,en} }]
 * - map: posición del pin en el mapa de la región (porcentaje del ancho y alto)
 * - colors: colores de su ilustración y tarjeta
 */
export const tours = [
  {
    id: 'machu-picchu',
    name: { es: 'Machu Picchu Full Day', en: 'Machu Picchu Full Day' },
    category: 'cultural',
    duration: { days: 1, hours: 17 },
    difficulty: 'moderada',
    altitude: 2430,
    price: 390,
    oldPrice: 450,
    featured: true,
    rank: 1,
    departures: DAILY,
    summary: {
      es: 'La ciudadela inca en un día: tren panorámico por el Valle Sagrado y visita guiada a Machu Picchu.',
      en: 'The Inca citadel in one day: scenic train through the Sacred Valley and a guided visit of Machu Picchu.',
    },
    includes: {
      es: ['Recojo del hotel', 'Tren ida y vuelta', 'Bus de subida y bajada', 'Entrada a Machu Picchu', 'Guía bilingüe', 'Almuerzo buffet'],
      en: ['Hotel pickup', 'Round-trip train', 'Shuttle bus up and down', 'Machu Picchu ticket', 'Bilingual guide', 'Buffet lunch'],
    },
    excludes: {
      es: ['Desayuno', 'Entrada a Huayna Picchu', 'Propinas'],
      en: ['Breakfast', 'Huayna Picchu ticket', 'Tips'],
    },
    itinerary: [
      { time: '03:30', title: { es: 'Recojo del hotel', en: 'Hotel pickup' }, text: { es: 'Traslado a la estación de Ollantaytambo.', en: 'Transfer to Ollantaytambo station.' } },
      { time: '05:00', title: { es: 'Tren al pueblo de Machu Picchu', en: 'Train to Machu Picchu town' }, text: { es: 'Viaje panorámico junto al río Urubamba.', en: 'Scenic ride along the Urubamba river.' } },
      { time: '07:30', title: { es: 'Bus a la ciudadela', en: 'Bus to the citadel' }, text: { es: '25 minutos de subida en zigzag.', en: '25-minute zigzag climb.' } },
      { time: '08:00', title: { es: 'Visita guiada', en: 'Guided visit' }, text: { es: 'Dos horas y media por templos, plazas y terrazas.', en: 'Two and a half hours through temples, squares and terraces.' } },
      { time: '12:30', title: { es: 'Almuerzo', en: 'Lunch' }, text: { es: 'Buffet en Aguas Calientes.', en: 'Buffet in Aguas Calientes.' } },
      { time: '20:30', title: { es: 'Retorno a Cusco', en: 'Back in Cusco' }, text: { es: 'Tren y traslado hasta tu hotel.', en: 'Train and transfer to your hotel.' } },
    ],
    bring: {
      es: ['Pasaporte original', 'Bloqueador y gorra', 'Impermeable', 'Agua'],
      en: ['Original passport', 'Sunscreen and hat', 'Rain jacket', 'Water'],
    },
    illustration: 'machu-picchu',
    photo: 'machu-picchu.jpg',
    map: { x: 22, y: 27 },
    colors: { main: '#2F5D50', accent: '#F2B33D', sky: '#CFE3DC' },
  },
  {
    id: 'vinicunca',
    name: { es: 'Montaña de 7 Colores (Vinicunca)', en: 'Rainbow Mountain (Vinicunca)' },
    category: 'aventura',
    duration: { days: 1, hours: 14 },
    difficulty: 'exigente',
    altitude: 5036,
    price: 35,
    oldPrice: 45,
    featured: true,
    rank: 2,
    departures: DAILY,
    summary: {
      es: 'Caminata a más de 5 000 metros hasta la famosa montaña de rayas de colores.',
      en: 'A hike above 5,000 meters to the famous striped, colorful mountain.',
    },
    includes: {
      es: ['Recojo del hotel', 'Desayuno y almuerzo', 'Guía de montaña', 'Botiquín y oxígeno'],
      en: ['Hotel pickup', 'Breakfast and lunch', 'Mountain guide', 'First-aid kit and oxygen'],
    },
    excludes: {
      es: ['Entrada a la montaña (S/ 25)', 'Caballo para subir', 'Bastones'],
      en: ['Mountain fee (S/ 25)', 'Horse ride up', 'Trekking poles'],
    },
    itinerary: [
      { time: '04:00', title: { es: 'Recojo del hotel', en: 'Hotel pickup' }, text: { es: 'Viaje de 3 horas hacia Cusipata.', en: '3-hour drive to Cusipata.' } },
      { time: '07:00', title: { es: 'Desayuno', en: 'Breakfast' }, text: { es: 'Desayuno caliente antes de la caminata.', en: 'Hot breakfast before the hike.' } },
      { time: '08:30', title: { es: 'Inicio de la caminata', en: 'Start of the hike' }, text: { es: 'Unas 2 horas de subida a tu ritmo.', en: 'About 2 hours uphill at your own pace.' } },
      { time: '10:30', title: { es: 'Cumbre de Vinicunca', en: 'Vinicunca summit' }, text: { es: 'Vista de los colores y del nevado Ausangate.', en: 'Views of the colors and Ausangate glacier.' } },
      { time: '14:00', title: { es: 'Almuerzo', en: 'Lunch' }, text: { es: 'Almuerzo buffet de regreso.', en: 'Buffet lunch on the way back.' } },
      { time: '18:00', title: { es: 'Llegada a Cusco', en: 'Back in Cusco' }, text: { es: 'Te dejamos cerca de tu hotel.', en: 'Drop-off near your hotel.' } },
    ],
    bring: {
      es: ['Ropa abrigadora en capas', 'Zapatillas de trekking', 'Bloqueador', 'Snacks y agua'],
      en: ['Warm layered clothing', 'Hiking shoes', 'Sunscreen', 'Snacks and water'],
    },
    illustration: 'vinicunca',
    photo: 'vinicunca.jpg',
    map: { x: 80, y: 78 },
    colors: { main: '#C2502E', accent: '#F2B33D', sky: '#E4D9EC' },
  },
  {
    id: 'humantay',
    name: { es: 'Laguna Humantay', en: 'Humantay Lake' },
    category: 'naturaleza',
    duration: { days: 1, hours: 14 },
    difficulty: 'moderada',
    altitude: 4200,
    price: 40,
    featured: true,
    rank: 3,
    departures: DAILY,
    summary: {
      es: 'Una laguna turquesa al pie del nevado Salkantay, entre las más bellas de los Andes.',
      en: 'A turquoise lake at the foot of Salkantay glacier, one of the most beautiful in the Andes.',
    },
    includes: {
      es: ['Recojo del hotel', 'Desayuno y almuerzo', 'Guía bilingüe', 'Entrada a la laguna'],
      en: ['Hotel pickup', 'Breakfast and lunch', 'Bilingual guide', 'Lake entrance fee'],
    },
    excludes: { es: ['Caballo para subir', 'Propinas'], en: ['Horse ride up', 'Tips'] },
    itinerary: [
      { time: '04:30', title: { es: 'Recojo del hotel', en: 'Hotel pickup' }, text: { es: 'Viaje hacia Mollepata.', en: 'Drive to Mollepata.' } },
      { time: '07:00', title: { es: 'Desayuno en Mollepata', en: 'Breakfast in Mollepata' }, text: { es: 'Desayuno andino.', en: 'Andean breakfast.' } },
      { time: '09:00', title: { es: 'Caminata a la laguna', en: 'Hike to the lake' }, text: { es: 'Una hora y media desde Soraypampa.', en: 'An hour and a half from Soraypampa.' } },
      { time: '10:30', title: { es: 'Laguna Humantay', en: 'Humantay Lake' }, text: { es: 'Tiempo libre para fotos y ofrenda andina.', en: 'Free time for photos and an Andean offering.' } },
      { time: '18:30', title: { es: 'Retorno a Cusco', en: 'Back in Cusco' }, text: { es: 'Llegada al centro de la ciudad.', en: 'Arrival in the city center.' } },
    ],
    bring: {
      es: ['Ropa abrigadora', 'Zapatillas de trekking', 'Bloqueador', 'Agua'],
      en: ['Warm clothing', 'Hiking shoes', 'Sunscreen', 'Water'],
    },
    illustration: 'humantay',
    photo: 'humantay.jpg',
    map: { x: 24, y: 58 },
    colors: { main: '#2F5D50', accent: '#3FB6B0', sky: '#D7EAF0' },
  },
  {
    id: 'valle-sagrado',
    name: { es: 'Valle Sagrado de los Incas', en: 'Sacred Valley of the Incas' },
    category: 'cultural',
    duration: { days: 1, hours: 11 },
    difficulty: 'facil',
    altitude: 3762,
    price: 45,
    featured: true,
    rank: 4,
    departures: DAILY,
    summary: {
      es: 'Pisac, Ollantaytambo y Chinchero: mercados, andenes y pueblos vivos del valle.',
      en: 'Pisac, Ollantaytambo and Chinchero: markets, terraces and living valley towns.',
    },
    includes: {
      es: ['Transporte turístico', 'Guía bilingüe', 'Almuerzo buffet en Urubamba'],
      en: ['Tourist transport', 'Bilingual guide', 'Buffet lunch in Urubamba'],
    },
    excludes: { es: ['Boleto turístico (aprox. S/ 70)', 'Desayuno'], en: ['Tourist ticket (approx. S/ 70)', 'Breakfast'] },
    itinerary: [
      { time: '07:30', title: { es: 'Salida de Cusco', en: 'Departure from Cusco' }, text: { es: 'Mirador de Taray.', en: 'Taray viewpoint.' } },
      { time: '09:00', title: { es: 'Pisac', en: 'Pisac' }, text: { es: 'Andenes incas y mercado artesanal.', en: 'Inca terraces and artisan market.' } },
      { time: '13:00', title: { es: 'Almuerzo en Urubamba', en: 'Lunch in Urubamba' }, text: { es: 'Buffet con cocina novoandina.', en: 'Buffet with Novo-Andean cuisine.' } },
      { time: '14:30', title: { es: 'Ollantaytambo', en: 'Ollantaytambo' }, text: { es: 'Fortaleza inca y pueblo vivo.', en: 'Inca fortress and living town.' } },
      { time: '17:00', title: { es: 'Chinchero', en: 'Chinchero' }, text: { es: 'Tejedoras y templo colonial.', en: 'Weavers and colonial church.' } },
    ],
    bring: { es: ['Gorra y bloqueador', 'Casaca ligera', 'Efectivo para el mercado'], en: ['Hat and sunscreen', 'Light jacket', 'Cash for the market'] },
    illustration: 'valle-sagrado',
    photo: 'valle-sagrado.jpg',
    map: { x: 46, y: 33 },
    colors: { main: '#2F5D50', accent: '#C2502E', sky: '#E8EFD9' },
  },
  {
    id: 'city-tour',
    name: { es: 'City Tour Cusco', en: 'Cusco City Tour' },
    category: 'cultural',
    duration: { days: 1, hours: 5 },
    difficulty: 'facil',
    altitude: 3700,
    price: 25,
    rank: 6,
    departures: DAILY,
    summary: {
      es: 'Qoricancha, la Catedral y los cuatro sitios incas de los alrededores en una tarde.',
      en: 'Qoricancha, the Cathedral and the four Inca sites around the city in one afternoon.',
    },
    includes: { es: ['Transporte turístico', 'Guía bilingüe'], en: ['Tourist transport', 'Bilingual guide'] },
    excludes: {
      es: ['Entrada a la Catedral y Qoricancha', 'Boleto turístico'],
      en: ['Cathedral and Qoricancha tickets', 'Tourist ticket'],
    },
    itinerary: [
      { time: '13:30', title: { es: 'Qoricancha', en: 'Qoricancha' }, text: { es: 'El templo del Sol.', en: 'The Temple of the Sun.' } },
      { time: '14:30', title: { es: 'Sacsayhuamán', en: 'Sacsayhuamán' }, text: { es: 'Muros de piedra gigantes.', en: 'Giant stone walls.' } },
      { time: '15:30', title: { es: 'Q’enqo, Puka Pukara y Tambomachay', en: 'Q’enqo, Puka Pukara and Tambomachay' }, text: { es: 'Templos y fuentes incas.', en: 'Inca temples and fountains.' } },
      { time: '18:30', title: { es: 'Retorno a la plaza', en: 'Back to the square' }, text: { es: 'Fin del tour en el centro.', en: 'Tour ends downtown.' } },
    ],
    bring: { es: ['Casaca', 'Boleto turístico', 'Zapatillas cómodas'], en: ['Jacket', 'Tourist ticket', 'Comfortable shoes'] },
    illustration: 'city-tour',
    photo: 'city-tour.jpg',
    map: { x: 58, y: 52 },
    colors: { main: '#C2502E', accent: '#F2B33D', sky: '#F4EBDD' },
  },
  {
    id: 'maras-moray',
    name: { es: 'Maras y Moray', en: 'Maras and Moray' },
    category: 'naturaleza',
    duration: { days: 1, hours: 6 },
    difficulty: 'facil',
    altitude: 3500,
    price: 30,
    rank: 5,
    departures: [1, 2, 3, 4, 5, 6],
    summary: {
      es: 'Los andenes circulares de Moray y las miles de pozas de sal de Maras.',
      en: 'The circular terraces of Moray and the thousands of salt pools of Maras.',
    },
    includes: { es: ['Transporte turístico', 'Guía bilingüe'], en: ['Tourist transport', 'Bilingual guide'] },
    excludes: { es: ['Entradas (aprox. S/ 30)', 'Alimentación'], en: ['Entrance fees (approx. S/ 30)', 'Meals'] },
    itinerary: [
      { time: '08:00', title: { es: 'Salida de Cusco', en: 'Departure from Cusco' }, text: { es: 'Rumbo a la pampa de Chinchero.', en: 'Heading to the Chinchero plateau.' } },
      { time: '09:30', title: { es: 'Moray', en: 'Moray' }, text: { es: 'El laboratorio agrícola de los incas.', en: 'The Inca agricultural lab.' } },
      { time: '11:00', title: { es: 'Salineras de Maras', en: 'Maras salt pans' }, text: { es: 'Más de 3 000 pozas de sal.', en: 'More than 3,000 salt pools.' } },
      { time: '14:00', title: { es: 'Llegada a Cusco', en: 'Back in Cusco' }, text: { es: 'Fin del tour.', en: 'End of the tour.' } },
    ],
    bring: { es: ['Gorra y bloqueador', 'Agua', 'Efectivo para las entradas'], en: ['Hat and sunscreen', 'Water', 'Cash for the fees'] },
    illustration: 'maras-moray',
    photo: 'maras-moray.jpg',
    map: { x: 38, y: 43 },
    colors: { main: '#C2502E', accent: '#2F5D50', sky: '#F6EEE2' },
  },
  {
    id: 'camino-inca',
    name: { es: 'Camino Inca Clásico 4D/3N', en: 'Classic Inca Trail 4D/3N' },
    category: 'aventura',
    duration: { days: 4, hours: 0 },
    difficulty: 'exigente',
    altitude: 4215,
    price: 690,
    featured: true,
    rank: 7,
    departures: [1, 3, 5],
    summary: {
      es: 'La ruta de los incas: cuatro días de caminata hasta entrar a Machu Picchu por la Puerta del Sol.',
      en: 'The Inca route: four days of trekking to enter Machu Picchu through the Sun Gate.',
    },
    includes: {
      es: ['Permiso del Camino Inca', 'Guía, cocinero y porteadores', 'Carpas y comidas', 'Entrada a Machu Picchu', 'Tren de regreso'],
      en: ['Inca Trail permit', 'Guide, cook and porters', 'Tents and meals', 'Machu Picchu ticket', 'Return train'],
    },
    excludes: { es: ['Bolsa de dormir', 'Porteador personal', 'Propinas'], en: ['Sleeping bag', 'Personal porter', 'Tips'] },
    itinerary: [
      { day: 1, title: { es: 'Km 82 – Wayllabamba', en: 'Km 82 – Wayllabamba' }, text: { es: 'Inicio de la caminata junto al río y primeros sitios incas.', en: 'Start of the trek along the river and first Inca sites.' } },
      { day: 2, title: { es: 'Paso de Warmiwañusca', en: 'Dead Woman’s Pass' }, text: { es: 'El día más duro: subida al punto más alto, 4 215 m.', en: 'The toughest day: climb to the highest point, 4,215 m.' } },
      { day: 3, title: { es: 'Bosque nublado – Wiñay Wayna', en: 'Cloud forest – Wiñay Wayna' }, text: { es: 'El tramo más bonito, entre ruinas y orquídeas.', en: 'The most beautiful stretch, among ruins and orchids.' } },
      { day: 4, title: { es: 'Puerta del Sol – Machu Picchu', en: 'Sun Gate – Machu Picchu' }, text: { es: 'Amanecer sobre la ciudadela y visita guiada.', en: 'Sunrise over the citadel and guided visit.' } },
    ],
    bring: {
      es: ['Pasaporte original', 'Bolsa de dormir', 'Linterna frontal', 'Ropa para lluvia y frío'],
      en: ['Original passport', 'Sleeping bag', 'Headlamp', 'Rain and cold-weather gear'],
    },
    illustration: 'camino-inca',
    photo: 'camino-inca.jpg',
    map: { x: 31, y: 24 },
    colors: { main: '#2F5D50', accent: '#F2B33D', sky: '#D9E6DF' },
  },
  {
    id: 'valle-sur',
    name: { es: 'Valle Sur (Tipón, Pikillacta, Andahuaylillas)', en: 'South Valley (Tipón, Pikillacta, Andahuaylillas)' },
    category: 'mistico',
    duration: { days: 1, hours: 6 },
    difficulty: 'facil',
    altitude: 3560,
    price: 30,
    rank: 8,
    departures: [2, 4, 6],
    summary: {
      es: 'Fuentes sagradas de Tipón, la ciudad preinca de Pikillacta y la “Capilla Sixtina de América”, con una ofrenda a la Pachamama.',
      en: 'The sacred fountains of Tipón, the pre-Inca city of Pikillacta and the “Sistine Chapel of the Americas”, with an offering to Pachamama.',
    },
    includes: {
      es: ['Transporte turístico', 'Guía bilingüe', 'Ceremonia de ofrenda a la Pachamama'],
      en: ['Tourist transport', 'Bilingual guide', 'Offering ceremony to Pachamama'],
    },
    excludes: { es: ['Entradas', 'Alimentación'], en: ['Entrance fees', 'Meals'] },
    itinerary: [
      { time: '08:00', title: { es: 'Tipón', en: 'Tipón' }, text: { es: 'Canales y fuentes de agua sagrada.', en: 'Canals and sacred water fountains.' } },
      { time: '10:00', title: { es: 'Pikillacta', en: 'Pikillacta' }, text: { es: 'La ciudad wari, anterior a los incas.', en: 'The Wari city, older than the Incas.' } },
      { time: '11:30', title: { es: 'Andahuaylillas', en: 'Andahuaylillas' }, text: { es: 'Iglesia colonial pintada de techo a piso.', en: 'Colonial church painted floor to ceiling.' } },
      { time: '13:00', title: { es: 'Ofrenda a la Pachamama', en: 'Offering to Pachamama' }, text: { es: 'Ceremonia andina de agradecimiento.', en: 'Andean thanksgiving ceremony.' } },
    ],
    bring: { es: ['Casaca', 'Agua', 'Efectivo para las entradas'], en: ['Jacket', 'Water', 'Cash for the fees'] },
    illustration: 'valle-sur',
    photo: 'valle-sur.jpg',
    map: { x: 68, y: 62 },
    colors: { main: '#6B3E7A', accent: '#F2B33D', sky: '#EFE6F0' },
  },
]

// ─── Inicio ──────────────────────────────────────────────────
export const stats = [
  { value: 12, label: { es: 'años de experiencia', en: 'years of experience' } },
  { value: 18500, label: { es: 'viajeros felices', en: 'happy travelers' }, suffix: '+' },
  { value: tours.length, label: { es: 'tours en Cusco', en: 'tours in Cusco' } },
  { value: 4.9, decimals: 1, label: { es: 'calificación promedio', en: 'average rating' }, suffix: '★' },
]

export const reasons = [
  { icon: 'guia', title: { es: 'Guías locales', en: 'Local guides' }, text: { es: 'Nacidos en Cusco, con historias que no salen en las guías.', en: 'Born in Cusco, with stories you won’t find in guidebooks.' } },
  { icon: 'grupo', title: { es: 'Grupos pequeños', en: 'Small groups' }, text: { es: 'Máximo 12 viajeros para que el tour sea tuyo.', en: 'Up to 12 travelers so the tour feels like yours.' } },
  { icon: 'escudo', title: { es: 'Pago seguro', en: 'Secure payment' }, text: { es: 'Tarjeta, transferencia o billetera móvil, con comprobante.', en: 'Card, bank transfer or mobile wallet, with a receipt.' } },
  { icon: 'soporte', title: { es: 'Soporte 24/7 por WhatsApp', en: '24/7 WhatsApp support' }, text: { es: 'Antes, durante y después de tu viaje.', en: 'Before, during and after your trip.' } },
]

// Opiniones de EJEMPLO (no son reales)
export const testimonials = [
  {
    name: 'Laura',
    country: { es: 'España', en: 'Spain' },
    tour: 'humantay',
    text: { es: 'La laguna es increíble y el guía nos cuidó todo el tiempo con la altura. Muy bien organizado.', en: 'The lake is incredible and our guide looked after us with the altitude the whole time. Very well organized.' },
    color: '#C2502E',
  },
  {
    name: 'James',
    country: { es: 'Estados Unidos', en: 'United States' },
    tour: 'machu-picchu',
    text: { es: 'Reservé por WhatsApp en dos minutos y todo salió perfecto: tren, bus y entradas listas.', en: 'Booked on WhatsApp in two minutes and everything went perfectly: train, bus and tickets ready.' },
    color: '#2F5D50',
  },
  {
    name: 'Ana',
    country: { es: 'Brasil', en: 'Brazil' },
    tour: 'vinicunca',
    text: { es: 'Exigente pero inolvidable. El desayuno caliente antes de subir fue lo mejor.', en: 'Challenging but unforgettable. The hot breakfast before the climb was the best.' },
    color: '#6B3E7A',
  },
]

// ─── Nosotros ────────────────────────────────────────────────
// Guías FICTICIOS con avatares ilustrados (no son personas reales)
export const team = [
  {
    name: 'Rosa Quispe',
    role: { es: 'Guía de montaña', en: 'Mountain guide' },
    languages: ['ES', 'EN', 'QU'],
    avatar: { skin: '#B9784F', hair: '#2B1B14', hat: '#C2502E', bg: '#F2B33D' },
  },
  {
    name: 'Wilber Huamán',
    role: { es: 'Guía cultural', en: 'Cultural guide' },
    languages: ['ES', 'EN', 'FR'],
    avatar: { skin: '#A86B45', hair: '#1E1E1E', hat: null, bg: '#3FB6B0' },
  },
  {
    name: 'Lucía Mamani',
    role: { es: 'Guía de naturaleza', en: 'Nature guide' },
    languages: ['ES', 'EN', 'PT'],
    avatar: { skin: '#C08660', hair: '#3A2418', hat: '#2F5D50', bg: '#E89A7E' },
  },
]

export const certifications = [
  { es: 'Agencia registrada ante la autoridad de turismo (ejemplo)', en: 'Agency registered with the tourism authority (sample)' },
  { es: 'Guías oficiales de turismo con licencia (ejemplo)', en: 'Licensed official tour guides (sample)' },
  { es: 'Primeros auxilios en altura (ejemplo)', en: 'High-altitude first aid (sample)' },
]

export const languagesSpoken = ['Español', 'English', 'Français', 'Português', 'Runa Simi (quechua)']
