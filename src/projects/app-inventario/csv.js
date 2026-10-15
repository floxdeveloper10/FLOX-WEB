// Reporte del inventario en CSV compatible con Excel:
// BOM UTF-8 (para que las tildes se vean bien), separador punto y coma y fin de línea CRLF.
import { categoryLabel, isoDate } from './inventario.data.js'
import { STATUS_LABEL } from './useInventario.js'

const SEP = ';'

// Comillas solo cuando hace falta (separador, comillas o saltos de línea)
function cell(value) {
  const text = value === null || value === undefined ? '' : String(value)
  return /[;"\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

const money = (n) => n.toFixed(2)

export function inventoryCsv(products, statuses) {
  const header = ['Código', 'Producto', 'Categoría', 'Stock', 'Stock mínimo', 'Estado', 'Costo (S/)', 'Precio de venta (S/)', 'Valor a costo (S/)', 'Proveedor', 'Vencimiento']
  const rows = [...products]
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))
    .map((p) => [
      // El código va como texto (="…") para que Excel no lo convierta en número científico
      `="${p.code}"`,
      p.name,
      categoryLabel[p.category] ?? p.category,
      p.stock,
      p.min,
      STATUS_LABEL[statuses[p.code]?.main ?? 'ok'],
      money(p.cost),
      money(p.price),
      money(p.stock * p.cost),
      p.supplier,
      p.expires ?? '',
    ])
  const total = products.reduce((sum, p) => sum + p.stock * p.cost, 0)
  rows.push([])
  rows.push(['', 'Total valor del inventario', '', '', '', '', '', '', money(total), '', ''])
  return [header, ...rows].map((r) => r.map(cell).join(SEP)).join('\r\n')
}

// Genera el archivo y lo descarga (Blob + enlace temporal). Devuelve el nombre del archivo.
export function downloadCsv(content, today = new Date()) {
  const name = `stock-andino-inventario-${isoDate(today)}.csv`
  const blob = new Blob(['﻿', content], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return name
}
