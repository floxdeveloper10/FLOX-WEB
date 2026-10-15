import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { CHAKANA_OUTLINE, CHAKANA_VIEWBOX } from '../components/brand/geometry.js'
import usePageMeta from '../hooks/usePageMeta.js'
import { seo } from '../data/seo.js'
import './NotFound.css'

const TEXTS = {
  eyebrow: 'Error 404',
  title: 'Esta página se desconectó',
  lead: 'No encontramos lo que buscas. Puede que el enlace esté mal escrito o que la página ya no exista.',
  button: 'Volver al inicio',
}

// Chakana "desconectada": contorno apagado, una pista cortada con una chispa
// y un contacto que titila, como una placa que perdió la conexión.
function ChakanaDisconnected() {
  return (
    <svg viewBox={CHAKANA_VIEWBOX} className="chakana-off" role="img" aria-label="Chakana desconectada">
      <path d={CHAKANA_OUTLINE} fill="none" stroke="#00B8A9" strokeWidth="5" className="chakana-off__outline" />
      <path d="M32 24 V8 M24 32 H8 M32 40 V56" fill="none" stroke="#FF6B1A" strokeWidth="3.5" opacity="0.45" />
      {/* Pista derecha cortada */}
      <path d="M40 32 H44.5" fill="none" stroke="#FF6B1A" strokeWidth="3.5" opacity="0.45" />
      <path d="M50.5 33.5 L56 32" fill="none" stroke="#FF6B1A" strokeWidth="3.5" opacity="0.45" />
      <g className="chakana-off__spark">
        <path d="M47.5 26 L46 31 L49 31 L46.5 38" fill="none" stroke="#FFC21A" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      </g>
      <circle cx="32" cy="8" r="4" fill="#6B5A85" />
      <circle cx="8" cy="32" r="4" fill="#6B5A85" />
      <circle cx="32" cy="56" r="4" fill="#6B5A85" />
      <circle cx="56" cy="32" r="4" fill="#FFC21A" className="chakana-off__contact" />
      <rect x="24" y="24" width="16" height="16" rx="2" fill="#E8185D" className="chakana-off__chip" />
    </svg>
  )
}

export default function NotFound() {
  usePageMeta(seo.notFound)

  return (
    <PageHero
      className="notfound"
      titleId="notfound-titulo"
      eyebrow={TEXTS.eyebrow}
      title={TEXTS.title}
      lead={TEXTS.lead}
      art={<ChakanaDisconnected />}
    >
      <Link to="/" className="btn btn--primary notfound__button">
        {TEXTS.button}
      </Link>
    </PageHero>
  )
}
