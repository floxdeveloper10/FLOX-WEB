import AppScreen from '../apps/AppScreens.jsx'
import './ProjectPreview.css'

// Ilustración de portada de cada negocio (dentro del mini navegador)
function HeroArt({ slug }) {
  if (slug === 'hotel') {
    // Noche cusqueña: luna (killa), estrellas y la silueta del hotel
    return (
      <svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" className="pp__hero-art">
        <circle cx="250" cy="34" r="16" fill="var(--pp-accent)" />
        <circle cx="258" cy="29" r="14" fill="var(--pp-primary)" />
        {[[40, 20], [90, 36], [150, 14], [200, 44], [290, 70], [120, 52]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#fff" opacity="0.8" />
        ))}
        <path d="M0 120 V92 L40 70 L84 88 L130 62 L180 84 L230 66 L280 86 L320 74 V120 Z" fill="var(--pp-secondary)" />
        <rect x="190" y="70" width="60" height="50" fill="#141c30" />
        <path d="M184 72 L220 54 L256 72 Z" fill="#141c30" />
        {[0, 1, 2].map((c) =>
          [0, 1].map((r) => (
            <rect key={`${c}-${r}`} x={198 + c * 16} y={80 + r * 16} width="8" height="9" fill="var(--pp-accent)" opacity={r === 1 && c === 2 ? 0.35 : 0.9} />
          )),
        )}
      </svg>
    )
  }
  // Agencia: montañas con nevados, sol y camino
  return (
    <svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" className="pp__hero-art">
      <circle cx="240" cy="36" r="18" fill="var(--pp-accent)" />
      <path d="M0 120 L60 50 L96 80 L150 26 L210 92 L250 64 L320 110 V120 Z" fill="#0a4f3a" />
      <path d="M138 38 L150 26 L162 40 L154 37 L149 42 L144 37 Z" fill="#fff" />
      <path d="M50 62 L60 50 L70 62 L64 60 L59 64 Z" fill="#fff" />
      <path d="M0 120 Q80 92 160 108 T320 100 V120 Z" fill="var(--pp-secondary)" />
      <path d="M150 120 Q170 104 200 108" stroke="#f3e2c0" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Browser({ project }) {
  return (
    <div className="pp__browser">
      <div className="pp__bar">
        <span className="pp__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="pp__url">{project.url}</span>
      </div>
      <div className="pp__page">
        <div className="pp__nav">
          <span className="pp__brand">{project.name}</span>
          <span className="pp__nav-links">
            <i />
            <i />
            <i />
          </span>
          <span className="pp__nav-btn" />
        </div>
        <div className="pp__hero">
          <HeroArt slug={project.slug} />
          <div className="pp__hero-copy">
            <span className="pp__line pp__line--title" />
            <span className="pp__line pp__line--title pp__line--short" />
            <span className="pp__pill" />
          </div>
        </div>
        <div className="pp__cards">
          {[0, 1, 2].map((i) => (
            <span key={i} className="pp__card">
              <span className="pp__thumb" />
              <span className="pp__line" />
              <span className="pp__line pp__line--short" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Phone() {
  return (
    <div className="pp__phone">
      <span className="pp__notch" />
      <div className="pp__screen">
        <div className="pp__cover">
          <svg viewBox="0 0 160 60" preserveAspectRatio="xMidYMid slice">
            <rect width="160" height="60" fill="#F4A259" />
            <circle cx="118" cy="24" r="10" fill="#FFD166" />
            <path d="M0 50 L30 22 L46 36 L70 14 L98 44 L120 30 L160 52 V60 H0 Z" fill="#8A3A20" />
            <path d="M0 54 Q40 46 80 52 T160 50 V60 H0 Z" fill="#5E7C3A" />
          </svg>
          <span className="pp__textile" />
        </div>
        <span className="pp__avatar" />
        <span className="pp__line pp__line--center" />
        <span className="pp__line pp__line--center pp__line--short" />
        <span className="pp__featured" />
        <span className="pp__tabs">
          <i className="is-on" />
          <i />
          <i />
          <i />
        </span>
        {[0, 1, 2].map((i) => (
          <span key={i} className="pp__dish">
            <span className="pp__dish-text">
              <span className="pp__line" />
              <span className="pp__line pp__line--short" />
            </span>
            <span className="pp__plate" />
          </span>
        ))}
      </div>
    </div>
  )
}

// App móvil: celular con la pantalla principal de esa app
function AppPhone({ slug }) {
  return (
    <div className="pp__phone">
      <span className="pp__notch" />
      <div className="pp__screen pp__screen--app">
        <AppScreen app={slug} className="pp__app-screen" />
      </div>
    </div>
  )
}

/**
 * Vista previa dibujada (sin capturas) de un proyecto: mini celular o navegador
 * con los colores del negocio. Es decorativa.
 */
export default function ProjectPreview({ project, size = 'lg', overlay }) {
  const { colors } = project
  return (
    <div
      className={`pp pp--${size} pp--${project.preview}`}
      style={{
        '--pp-primary': colors.primary,
        '--pp-secondary': colors.secondary,
        '--pp-accent': colors.accent,
        '--pp-bg': colors.bg,
        '--pp-tint': colors.tint,
      }}
      aria-hidden="true"
    >
      <div className="pp__device">
        {project.preview === 'phone' && <Phone />}
        {project.preview === 'app' && <AppPhone slug={project.slug} />}
        {project.preview === 'browser' && <Browser project={project} />}
      </div>
      {overlay && <span className="pp__overlay">{overlay}</span>}
    </div>
  )
}
