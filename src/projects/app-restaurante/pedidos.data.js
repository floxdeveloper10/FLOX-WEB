// Qhapaq Pedidos: app de pedidos de la Picantería Qhapaq (restaurante ficticio).
// Los platos salen de la carta digital (src/data/carta.js); aquí se agregan los datos de pedidos.
import { allDishes, categories, restaurant } from '../../data/carta.js'

export { restaurant }

// Platos de la carta en español, con su categoría
export const dishes = categories.flatMap((cat) =>
  cat.dishes.map((d) => ({
    id: d.id,
    art: d.art,
    name: d.name.es,
    description: d.description.es,
    detail: d.detail.es,
    price: d.price,
    category: cat.id,
    tags: d.tags,
    spicy: d.spicy,
    // Entradas y fondos se pueden pedir para compartir y con extras
    food: cat.id === 'entradas' || cat.id === 'fondo',
  })),
)

export const dishById = Object.fromEntries(dishes.map((d) => [d.id, d]))

export const menuCategories = [
  { id: 'populares', label: 'Más pedidos' },
  ...categories.map((c) => ({ id: c.id, label: c.label.es })),
]

export const popularIds = allDishes.filter((d) => d.tags.includes('popular') || d.tags.includes('chef')).map((d) => d.id)

// Porciones: la de compartir cuesta 1.8 veces la personal (redondeado)
export const portions = [
  { id: 'personal', label: 'Personal', factor: 1 },
  { id: 'compartir', label: 'Para compartir (2–3)', factor: 1.8 },
]

export const extras = [
  { id: 'aji', label: 'Ají extra', price: 2 },
  { id: 'arroz', label: 'Porción de arroz', price: 4 },
]

export const promo = {
  title: 'Promo del día',
  text: 'Chiriuchu + chicha morada',
  price: 40,
  before: 46,
  art: 'chiriuchu',
  items: ['chiriuchu', 'chicha-morada'],
}

export const orderTypes = [
  { id: 'delivery', label: 'Delivery', short: 'Delivery' },
  { id: 'recojo', label: 'Recojo en local', short: 'Recojo' },
  { id: 'mesa', label: 'Para mi mesa', short: 'Mesa' },
]

export const SHIPPING = 5
export const TABLES = Array.from({ length: 12 }, (_, i) => i + 1)
export const exampleAddress = 'Calle Plateros 340, Cusco'
export const paymentNote = 'Pago al recibir (efectivo o Yape)'

// Minutos estimados según el tipo de pedido
export const estimateMinutes = { delivery: 35, recojo: 20, mesa: 15 }

// Estados del pedido. "salida" cambia de nombre según el tipo.
export const STATUSES = ['recibido', 'preparacion', 'listo', 'salida', 'entregado']

export function statusLabel(status, type) {
  if (status === 'salida') return type === 'delivery' ? 'En camino' : type === 'recojo' ? 'Para recoger' : 'Llevando a tu mesa'
  return {
    recibido: 'Recibido',
    preparacion: 'En preparación',
    listo: 'Listo',
    entregado: type === 'mesa' ? 'Servido' : 'Entregado',
    rechazado: 'Rechazado',
  }[status]
}

export function statusDetail(status, type) {
  return {
    recibido: 'La cocina recibió tu pedido.',
    preparacion: 'Estamos cocinando tu pedido.',
    listo: type === 'delivery' ? 'Tu pedido está listo y empacado.' : 'Tu pedido está listo.',
    salida:
      type === 'delivery'
        ? 'El motorizado va camino a tu dirección.'
        : type === 'recojo'
          ? 'Acércate al local: tu pedido te espera.'
          : 'El mozo lleva tu pedido a la mesa.',
    entregado: '¡Buen provecho!',
    rechazado: 'La picantería no pudo aceptar tu pedido. Escríbenos y te ayudamos.',
  }[status]
}

// Botón de la cocina para pasar al siguiente estado
export function nextAction(status, type) {
  if (status === 'recibido') return 'Aceptar y preparar'
  if (status === 'preparacion') return 'Marcar como listo'
  if (status === 'listo') return type === 'delivery' ? 'Enviar con motorizado' : type === 'recojo' ? 'Avisar: listo para recoger' : 'Llevar a la mesa'
  if (status === 'salida') return 'Marcar entregado'
  return null
}

// Para "Simular pedido de otro cliente"
export const sampleCustomers = ['Rosa M.', 'Carlos Q.', 'Lucía V.', 'Mateo H.', 'Valeria C.', 'Jorge T.', 'Ana P.', 'Diego R.']
export const sampleNotes = ['Sin cebolla, por favor', 'Bien caliente', 'El ají aparte', 'Sin culantro', '']
export const sampleAddresses = ['Av. El Sol 820', 'Calle Saphi 455', 'Jr. Tullumayo 210', 'Calle Choquechaca 132']

// Resumen del día antes de empezar la demo (ventas de ejemplo)
export const dayBase = {
  orders: 23,
  sales: 1184,
  dishCounts: { chiriuchu: 9, adobo: 7, lechon: 6, rocoto: 5, 'chicha-morada': 11 },
}

// Pestañas del panel de cocina
export const KITCHEN_TABS = [
  { id: 'nuevos', label: 'Nuevos', statuses: ['recibido'] },
  { id: 'preparacion', label: 'En preparación', statuses: ['preparacion'] },
  { id: 'listos', label: 'Listos', statuses: ['listo', 'salida'] },
]

// Notas laterales de la demo
export const clientNotes = [
  { screen: 'inicio', title: 'Carta con promo del día', text: 'Categorías deslizables, platos más pedidos y una promo que se agrega con un toque.' },
  { screen: 'plato', title: 'Detalle del plato', text: 'Porción personal o para compartir, extras, nota para cocina y cantidad.' },
  { screen: 'carrito', title: 'Carrito y tipo de pedido', text: 'Delivery, recojo o para la mesa. El pago es al recibir: efectivo o Yape.' },
  { screen: 'seguimiento', title: 'Seguimiento en vivo', text: 'Cada cambio de la cocina se ve al instante; en delivery, el motorizado avanza en el mapa.' },
  { screen: 'pedidos', title: 'Mis pedidos', text: 'Historial con "Volver a pedir" en un toque.' },
]

export const kitchenNotes = [
  { screen: 'nuevos', title: 'Pedidos al instante', text: 'Llegan con un sonido corto y una animación. Se aceptan o se rechazan (con confirmación).' },
  { screen: 'preparacion', title: 'Cronómetro por pedido', text: 'Cambia a ámbar a los 10 min y a rojo pasados los 15, para que nada se quede atrás.' },
  { screen: 'listos', title: 'Listos y entregas', text: 'Envío con motorizado, recojo o mesa. Arriba, el resumen del día con ventas y el plato más vendido.' },
]

export const pageText = {
  eyebrow: 'Proyecto demo · FLOX Apps',
  title: 'Qhapaq Pedidos',
  lead: 'Dos apps conectadas: haz un pedido en la app del cliente y mira cómo llega al instante al panel de cocina. Prueba también con dos pestañas abiertas.',
  clientLabel: 'App del cliente',
  kitchenLabel: 'App del restaurante',
  ctaTitle: '¿Quieres una app así para tu restaurante?',
  ctaText: 'Pedidos por delivery, recojo o en mesa, con panel de cocina y tu carta. Para Android e iPhone.',
  ctaButton: 'Quiero una app así',
  ctaMessage: 'Hola FLOX, vi la demo de Qhapaq Pedidos y quiero una app así para mi restaurante',
}
