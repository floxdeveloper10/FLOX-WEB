import { ADVANCE, urgency } from '../../data/precios.js'
import { rubroBySlug } from '../../data/rubros.js'

export const soles = (n) => `S/ ${n.toLocaleString('es-PE')}`

// Mensaje de WhatsApp ordenado con toda la cotización
export function quoteMessage(q, est) {
  const rubro = rubroBySlug[q.rubro]
  const urg = urgency.find((u) => u.id === q.urgency)
  const lines = [
    'Hola FLOX, quiero cotizar un proyecto.',
    '',
    `Rubro: ${rubro?.name ?? '—'}`,
    `Nombre: ${q.name.trim()}`,
    `Negocio: ${q.business.trim()}`,
    '',
    'Servicios:',
    ...est.services.map((s) => `• ${s.name}: ${s.quote ? 'cotización personalizada' : `desde ${soles(s.from)}`}`),
  ]
  if (est.extras.length) lines.push('', 'Extras:', ...est.extras.map((e) => `• ${e.name}: ${soles(e.price)}`))
  lines.push('', `Urgencia: ${urg.name}${est.surcharge ? ` (recargo de ${soles(est.surcharge)})` : ''}`)
  if (est.total > 0) {
    lines.push('', `Total estimado: ${soles(est.total)}`, `Adelanto (${ADVANCE * 100} %): ${soles(est.advance)}`)
  }
  if (est.hasApp) lines.push(est.total > 0 ? '+ App: cotización personalizada' : 'App: cotización personalizada')
  lines.push('', est.plan ? `Plan de mantenimiento: ${est.plan.name} (${soles(est.plan.monthly)} al mes, aparte)` : 'Plan de mantenimiento: por ahora no')
  lines.push('', '(Precio referencial calculado en el cotizador de la web de FLOX)')
  return lines.join('\n')
}
