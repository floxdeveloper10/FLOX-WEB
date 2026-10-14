import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AgenciaIcon from '../AgenciaIcon.jsx'
import { useAgencia } from '../../agenciaState.js'
import { tours } from '../../agencia.data.js'
import { durationLabel, to } from '../../utils.js'

// Fondo del mapa: Cusco y alrededores, estilizado (no está a escala)
function MapArt({ riverLabel }) {
  const peak = (x, y, s = 1, snow = true) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 20 L0 -24 L30 20 Z" fill="#C9A98A" />
      {snow && <path d="M-9 -10 L0 -24 L9 -10 L4 -12 L0 -6 L-4 -12 Z" fill="#FFFFFF" />}
    </g>
  )
  return (
    <svg viewBox="0 0 800 560" className="amap__art" aria-hidden="true" focusable="false">
      <rect width="800" height="560" rx="24" fill="#EADCC7" />
      {/* Zonas verdes de valles */}
      <path d="M120 120 C220 100 330 150 420 170 C500 190 560 200 620 260 C660 300 700 360 760 380 V560 H0 V200 Z" fill="#D9D4B0" opacity="0.7" />
      <path d="M170 150 C260 140 360 190 460 200 C520 205 560 230 580 260" fill="none" stroke="#B9C79A" strokeWidth="60" strokeLinecap="round" opacity="0.6" />
      {/* Río Urubamba / Vilcanota */}
      <path id="rio" d="M770 420 C700 380 640 330 600 270 C560 210 500 190 430 180 C360 170 300 150 230 130 C190 118 150 120 110 150" fill="none" stroke="#3FB6B0" strokeWidth="7" strokeLinecap="round" />
      <text fontFamily="Inter, sans-serif" fontSize="14" fontWeight="600" fill="#2A7D78">
        <textPath href="#rio" startOffset="40%">
          {riverLabel}
        </textPath>
      </text>
      {/* Nevados: Salkantay y Ausangate, y cerros */}
      {peak(205, 300, 1.5)}
      {peak(660, 470, 1.6)}
      {peak(320, 380, 0.9, false)}
      {peak(560, 140, 1, false)}
      {peak(110, 230, 1.1)}
      {peak(720, 300, 0.9, false)}
      <text x="205" y="345" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#5A554E">
        Salkantay
      </text>
      <text x="660" y="520" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#5A554E">
        Ausangate
      </text>
      {/* Ciudad del Cusco */}
      <g transform="translate(464 292)">
        <circle r="34" fill="#C2502E" opacity="0.15" />
        <rect x="-14" y="-10" width="10" height="10" fill="#C2502E" />
        <rect x="-2" y="-14" width="12" height="14" fill="#9E3D20" />
        <rect x="-10" y="2" width="22" height="8" fill="#C2502E" />
        <text y="-24" textAnchor="middle" fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="20" fill="#1E1E1E">
          Cusco
        </text>
      </g>
      {/* Carreteras */}
      <path d="M464 300 C430 320 300 360 190 330 M464 300 C520 340 600 400 640 440 M464 300 C440 260 400 230 380 205" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 6" opacity="0.9" />
      {/* Norte */}
      <g transform="translate(748 52)">
        <circle r="20" fill="#FFFFFF" />
        <path d="M0 -13 L7 5 L0 1 L-7 5 Z" fill="#1E1E1E" />
        <text y="36" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#1E1E1E">
          N
        </text>
      </g>
    </svg>
  )
}

// Mapa interactivo: un pin por tour; al tocarlo se abre una tarjetita
export default function RegionMap() {
  const { t, lang, price } = useAgencia()
  const [active, setActive] = useState(null)
  const rootRef = useRef(null)
  const pinRefs = useRef({})
  const uid = useId()
  const tour = tours.find((x) => x.id === active)

  // Cerrar con Escape o tocando fuera
  useEffect(() => {
    if (!active) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setActive(null)
        pinRefs.current[active]?.focus()
      }
    }
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setActive(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [active])

  // La tarjeta se abre arriba del pin, o abajo si el pin está muy arriba; y no se sale por los costados
  const placement = tour
    ? {
        vertical: tour.map.y < 40 ? 'below' : 'above',
        horizontal: tour.map.x < 25 ? 'start' : tour.map.x > 75 ? 'end' : 'center',
      }
    : null

  return (
    <section className="a-section a-section--white amap" aria-labelledby="amap-title">
      <div className="a-container amap__grid">
        <div className="a-heading">
          <p className="a-eyebrow">{t.map.eyebrow}</p>
          <h2 id="amap-title" className="a-title">
            {t.map.title}
          </h2>
          <p className="a-lead">{t.map.lead}</p>
        </div>

        {/* La tarjetita va fuera del dibujo: en escritorio flota junto al pin; en el celular, debajo del mapa */}
        <div ref={rootRef} className="amap__wrap">
          <div className="amap__frame" role="group" aria-label={t.map.label}>
            <MapArt riverLabel={t.map.river} />
            {tours.map((x) => (
              <button
                key={x.id}
                ref={(el) => {
                  pinRefs.current[x.id] = el
                }}
                type="button"
                className={`amap__pin ${active === x.id ? 'is-active' : ''}`}
                style={{ left: `${x.map.x}%`, top: `${x.map.y}%`, '--pin': x.colors.main }}
                aria-expanded={active === x.id}
                aria-controls={`${uid}-card`}
                aria-label={x.name[lang]}
                onClick={() => setActive((a) => (a === x.id ? null : x.id))}
              >
                <AgenciaIcon name="pin" />
              </button>
            ))}
          </div>

          <AnimatePresence>
            {tour && (
              <motion.div
                key={tour.id}
                id={`${uid}-card`}
                className={`amap__card amap__card--${placement.vertical} amap__card--${placement.horizontal}`}
                style={{ left: `${tour.map.x}%`, top: `${tour.map.y}%` }}
                role="dialog"
                aria-label={tour.name[lang]}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18 }}
              >
                <button type="button" className="amap__close" onClick={() => setActive(null)} aria-label={t.map.close}>
                  <AgenciaIcon name="close" />
                </button>
                <p className="amap__name">{tour.name[lang]}</p>
                <p className="amap__meta">
                  <AgenciaIcon name="clock" />
                  {durationLabel(tour, t)}
                </p>
                <p className="amap__price">
                  {t.card.from} <strong>{price(tour.price)}</strong>
                </p>
                <Link to={to(`/tours/${tour.id}`)} className="a-btn a-btn--primary amap__cta">
                  {t.card.view}
                  <AgenciaIcon name="arrow" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
