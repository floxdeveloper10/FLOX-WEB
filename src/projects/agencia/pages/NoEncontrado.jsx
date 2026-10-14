import { Link } from 'react-router-dom'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { to } from '../utils.js'

// 404 propia de la agencia: un sendero que se corta antes de la cumbre
export default function NoEncontrado() {
  const { t } = useAgencia()
  useAgenciaTitle(t.pageTitle.notFound)

  return (
    <section className="a-section anotfound" aria-labelledby="anotfound-title">
      <div className="a-container anotfound__inner">
        <svg viewBox="0 0 240 150" className="anotfound__art" aria-hidden="true" focusable="false">
          <path d="M10 140 L100 30 L140 80 L170 50 L230 140 Z" fill="#2F5D50" />
          <path d="M86 47 L100 30 L114 48 L104 44 L100 50 L95 44 Z" fill="#FFFFFF" />
          <path d="M60 140 L120 118 L80 104 L130 92" fill="none" stroke="#C2502E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M140 88 l10 -4 M156 82 l10 -4" stroke="#C2502E" strokeWidth="6" strokeLinecap="round" strokeDasharray="1 12" />
          <text x="182" y="40" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="34" fill="#F2B33D">
            404
          </text>
        </svg>
        <h1 id="anotfound-title" className="a-title">
          {t.notFound.title}
        </h1>
        <p className="a-lead">{t.notFound.text}</p>
        <Link to={to()} className="a-btn a-btn--primary">
          {t.notFound.back}
        </Link>
      </div>
    </section>
  )
}
