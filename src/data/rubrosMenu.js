// Datos livianos de los 6 rubros (menú, selector del inicio y cotizador).
// El contenido completo de cada página está en rubros.js (se descarga solo al entrar).

export const rubrosMenu = [
  { slug: 'restaurantes', name: 'Restaurantes', menuName: 'Restaurantes', menuDesc: 'Carta QR, pedidos y delivery', icon: 'plato' },
  { slug: 'hoteles', name: 'Hoteles y hostales', menuName: 'Hoteles y hostales', menuDesc: 'Reservas directas sin comisión', icon: 'cama' },
  { slug: 'agencias-de-turismo', name: 'Agencias de turismo', menuName: 'Agencias de turismo', menuDesc: 'Tours, calendario y reservas', icon: 'mochila' },
  { slug: 'tiendas', name: 'Tiendas y minimarkets', menuName: 'Tiendas y minimarkets', menuDesc: 'Catálogo, ventas e inventario', icon: 'bolsa' },
  { slug: 'gimnasios', name: 'Gimnasios', menuName: 'Gimnasios', menuDesc: 'Membresías, clases y rutinas', icon: 'pesa' },
  { slug: 'consultorios', name: 'Consultorios, barberías y spas', menuName: 'Consultorios y citas', menuDesc: 'Médicos, dentales, barberías y spas', icon: 'cita' },
]

export const pickerUi = {
  title: '¿Qué negocio tienes?',
  lead: 'Elige tu rubro y mira lo que podemos hacer por ti.',
}
