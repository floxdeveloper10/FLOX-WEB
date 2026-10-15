// Stock Andino: app de inventario para un minimarket ficticio de Cusco (demo de FLOX Apps).
// Productos, proveedores y movimientos son de ejemplo.

export const business = {
  name: 'Stock Andino',
  store: 'Minimarket Wayra · Cusco',
}

export const categories = [
  { id: 'abarrotes', label: 'Abarrotes' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'limpieza', label: 'Limpieza' },
  { id: 'lacteos', label: 'Lácteos' },
]

export const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]))

export const suppliers = ['Distribuidora Inti', 'Bebidas del Sur', 'Lácteos Valle Sagrado', 'Limpieza Andina']

// expiresIn: días hasta el vencimiento (se convierte en fecha al empezar la demo); null si no vence
// [código, nombre, categoría, stock, mínimo, costo, precio, proveedor, vence en (días)]
const RAW = [
  ['7750001000012', 'Arroz extra 5 kg', 'abarrotes', 42, 15, 17.5, 22.9, 0, null],
  ['7750001000029', 'Azúcar rubia 1 kg', 'abarrotes', 27, 20, 3.4, 4.5, 0, null],
  ['7750001000036', 'Aceite vegetal 1 L', 'abarrotes', 6, 12, 7.2, 9.5, 0, null],
  ['7750001000043', 'Fideos tallarín 500 g', 'abarrotes', 55, 20, 2.1, 3.2, 0, null],
  ['7750001000050', 'Atún en lata 170 g', 'abarrotes', 38, 18, 4.3, 5.9, 0, 210],
  ['7750001000067', 'Quinua perlada 1 kg', 'abarrotes', 14, 10, 8.5, 11.9, 0, null],
  ['7750001000074', 'Harina sin preparar 1 kg', 'abarrotes', 9, 10, 3.6, 4.9, 0, null],
  ['7750001000081', 'Lentejas 500 g', 'abarrotes', 24, 10, 3.9, 5.4, 0, null],
  ['7750002000011', 'Agua mineral 625 ml', 'bebidas', 96, 48, 0.9, 1.5, 1, null],
  ['7750002000028', 'Gaseosa 1.5 L', 'bebidas', 31, 24, 3.8, 5.5, 1, 120],
  ['7750002000035', 'Jugo de naranja 1 L', 'bebidas', 12, 12, 3.2, 4.8, 1, 5],
  ['7750002000042', 'Chicha morada 1 L', 'bebidas', 18, 10, 2.7, 4.2, 1, 9],
  ['7750002000059', 'Mate de coca (25 sobres)', 'bebidas', 40, 15, 2.4, 3.9, 1, null],
  ['7750002000066', 'Café molido 250 g', 'bebidas', 11, 8, 9.8, 13.5, 1, null],
  ['7750003000010', 'Detergente 900 g', 'limpieza', 22, 12, 6.9, 9.4, 3, null],
  ['7750003000027', 'Lejía 1 L', 'limpieza', 30, 12, 2.2, 3.4, 3, null],
  ['7750003000034', 'Jabón de tocador x3', 'limpieza', 8, 10, 4.1, 5.9, 3, null],
  ['7750003000041', 'Papel higiénico x4', 'limpieza', 46, 20, 4.6, 6.5, 3, null],
  ['7750003000058', 'Lavavajilla en pasta 500 g', 'limpieza', 15, 8, 3.3, 4.8, 3, null],
  ['7750004000019', 'Leche evaporada 400 g', 'lacteos', 64, 30, 3.1, 4.2, 2, 150],
  ['7750004000026', 'Yogur de fresa 1 L', 'lacteos', 9, 12, 5.2, 7.5, 2, 4],
  ['7750004000033', 'Queso fresco 500 g', 'lacteos', 7, 6, 9.5, 13.9, 2, 3],
  ['7750004000040', 'Mantequilla 200 g', 'lacteos', 13, 8, 6.1, 8.5, 2, 40],
  ['7750004000057', 'Leche fresca 1 L', 'lacteos', 20, 15, 3.5, 4.9, 2, 6],
  ['7750004000064', 'Huevos (bandeja x15)', 'lacteos', 5, 8, 7.8, 10.5, 2, 12],
]

export function isoDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

export function initialProducts(today = new Date()) {
  return RAW.map(([code, name, category, stock, min, cost, price, supplier, expiresIn]) => ({
    code,
    name,
    category,
    stock,
    min,
    cost,
    price,
    supplier: suppliers[supplier],
    expires: expiresIn === null ? null : isoDate(addDays(today, expiresIn)),
  }))
}

// Movimientos de los últimos 7 días (siempre los mismos, para que el gráfico tenga forma)
export function initialMovements(products, today = new Date()) {
  const moves = []
  let n = 1
  const at = (daysAgo, hour) => {
    const d = addDays(today, -daysAgo)
    d.setHours(hour, 15, 0, 0)
    return d.getTime()
  }
  const sales = [
    ['7750002000011', [14, 10, 12, 16, 11, 9, 6]],
    ['7750001000012', [3, 4, 2, 5, 3, 4, 2]],
    ['7750004000019', [8, 6, 9, 7, 5, 8, 4]],
    ['7750002000028', [6, 5, 7, 4, 6, 8, 3]],
    ['7750001000043', [5, 6, 4, 6, 5, 3, 2]],
    ['7750003000041', [3, 2, 4, 3, 2, 3, 1]],
    ['7750002000035', [2, 3, 2, 1, 3, 2, 1]],
    ['7750004000064', [2, 1, 2, 2, 1, 2, 1]],
  ]
  // Salidas por venta, del día más antiguo al de hoy
  for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
    sales.forEach(([code, perDay], i) => {
      const qty = perDay[6 - daysAgo]
      if (qty) moves.push({ id: n++, code, type: 'salida', qty, reason: 'Venta', at: at(daysAgo, 9 + (i % 9)) })
    })
  }
  // Entradas por compra a proveedor en algunos días
  const purchases = [
    [6, '7750002000011', 48],
    [6, '7750001000043', 24],
    [5, '7750004000019', 36],
    [4, '7750001000012', 20],
    [3, '7750002000028', 24],
    [3, '7750003000041', 24],
    [2, '7750004000040', 12],
    [1, '7750002000011', 48],
    [0, '7750001000081', 12],
  ]
  purchases.forEach(([daysAgo, code, qty]) => {
    if (products.some((p) => p.code === code)) moves.push({ id: n++, code, type: 'entrada', qty, reason: 'Compra a proveedor', at: at(daysAgo, 8) })
  })
  return { movements: moves.sort((a, b) => a.at - b.at), nextId: n }
}

export const reasons = {
  entrada: ['Compra a proveedor', 'Devolución de cliente', 'Ajuste de inventario'],
  salida: ['Venta', 'Merma o vencido', 'Uso interno', 'Ajuste de inventario'],
}

// Notas laterales de la demo
export const notes = [
  { screen: 'panel', title: 'Panel con cifras al día', text: 'Valor del inventario, stock bajo, por vencer y movimientos de hoy. Gráfico de entradas y salidas.' },
  { screen: 'productos', title: 'Productos y fichas', text: 'Buscador en vivo, filtros por categoría y estado, orden y la ficha de cada producto con su historial.' },
  { screen: 'movimiento', title: 'Entradas y salidas', text: 'Registra un movimiento o "escanea" el código (simulado) y todas las cifras se recalculan.' },
  { screen: 'alertas', title: 'Alertas y pedidos', text: 'Productos bajo el mínimo o por vencer. El pedido sugerido al proveedor sale por WhatsApp.' },
  { screen: 'reportes', title: 'Reportes en Excel', text: 'Resumen por categoría y descarga del inventario en CSV, listo para abrir en Excel.' },
  { screen: 'nuevo', title: 'Agregar productos', text: 'Formulario con validaciones: código único, precio mayor que el costo y stock mínimo válido.' },
]

export const pageText = {
  eyebrow: 'Proyecto demo · FLOX Apps',
  title: 'Stock Andino',
  lead: 'App de inventario para un minimarket de Cusco. Registra entradas y salidas, revisa alertas y descarga el reporte en Excel.',
  device: 'App Stock Andino en tablet (demo interactiva)',
  ctaTitle: '¿Quieres controlar tu inventario desde el celular?',
  ctaText: 'Stock al día, alertas antes de que se acabe algo y reportes en Excel. Para Android, iPhone y tablet.',
  ctaButton: 'Quiero una app así',
  ctaMessage: 'Hola FLOX, vi la demo de Stock Andino y quiero controlar el inventario de mi negocio desde el celular',
}
