import { whatsappLink } from '../data/site.js'
import { track } from './analytics.js'

// Para los botones que abren WhatsApp desde código (formularios de las demos), no desde un enlace:
// mide el clic y abre el chat en otra pestaña.
export function openWhatsApp(message, origen) {
  track('whatsapp_click', { origen })
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
}
