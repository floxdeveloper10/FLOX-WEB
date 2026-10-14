import WhatsAppIcon from './WhatsAppIcon.jsx'
import { site } from '../data/site.js'
import './WhatsAppFloat.css'

export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={site.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <WhatsAppIcon className="wa-float__icon" />
    </a>
  )
}
