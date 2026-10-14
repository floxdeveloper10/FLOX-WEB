import { motion } from 'framer-motion'
import HotelIcon from './HotelIcon.jsx'
import { HOTEL_COLORS as C } from '../palette.js'
import { useHotel } from '../hotelState.js'
import { distances, hotel } from '../hotel.data.js'
import './Location.css'

// Mapa ilustrado y sencillo de San Blas (no es un mapa a escala)
function MapIllustration({ label }) {
  const { lang } = useHotel()
  const street = { fill: 'none', stroke: C.white, strokeLinecap: 'round' }
  return (
    <svg viewBox="0 0 600 440" className="hloc__map" role="img" aria-label={label}>
      <rect width="600" height="440" fill="#EFEBE3" />
      {/* Manzanas */}
      {[
        [30, 30, 150, 90], [200, 30, 120, 70], [340, 20, 110, 110], [470, 40, 110, 80],
        [30, 150, 120, 110], [170, 130, 140, 100], [460, 150, 120, 90],
        [30, 290, 160, 120], [210, 270, 120, 140], [350, 300, 110, 110], [480, 270, 100, 140],
      ].map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="6" fill={C.stone2} />
      ))}
      {/* Cerro (zona verde al norte) */}
      <path d="M330 0 C380 40 460 20 600 30 V0 Z" fill="#CCD3BF" />
      {/* Calles */}
      <path d="M0 125 H600 M0 268 H600 M190 0 V440 M335 0 V440 M460 0 V440" {...street} strokeWidth="10" />
      {/* Cuesta de San Blas (diagonal) */}
      <path d="M250 250 C300 210 340 170 400 140" {...street} strokeWidth="14" />
      {/* Plaza de Armas */}
      <rect x="40" y="300" width="130" height="90" rx="4" fill="#C9D2B5" />
      <path d="M60 320 h90 v50 h-90 Z" fill="none" stroke="#AEB998" strokeWidth="2" />
      <rect x="92" y="306" width="26" height="22" fill={C.stone3} />
      <path d="M92 306 L105 294 L118 306 Z" fill={C.tile} />
      {/* Plaza San Blas */}
      <rect x="480" y="62" width="80" height="46" rx="4" fill="#C9D2B5" />
      {/* Ruta caminando desde el hotel hasta la Plaza de Armas */}
      <path d="M392 150 C350 170 300 220 252 252 C220 274 180 300 150 330" fill="none" stroke={C.gold} strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
      <g transform="translate(232 214)">
        <rect x="-38" y="-16" width="76" height="30" rx="15" fill={C.navy} />
        <text x="0" y="5" textAnchor="middle" fontFamily="DM Sans, sans-serif" fontSize="14" fontWeight="700" fill={C.white}>
          7 min
        </text>
      </g>
      {/* Etiquetas */}
      <g fontFamily="DM Sans, sans-serif" fontSize="15" fontWeight="700" fill={C.navy}>
        <text x="105" y="410" textAnchor="middle">Plaza de Armas</text>
        <text x="520" y="52" textAnchor="middle">{lang === 'es' ? 'Plaza San Blas' : 'San Blas Square'}</text>
      </g>
      {/* Marcador del hotel: pin dorado con la luna */}
      <g transform="translate(400 142)">
        <circle r="34" fill={C.gold} opacity="0.18" className="hloc__pulse" />
        <path d="M0 0 C-18 -20 -22 -30 -22 -40 a22 22 0 0 1 44 0 C22 -30 18 -20 0 0 Z" fill={C.navy} />
        <circle cy="-40" r="13" fill={C.goldLight} />
        <circle cx="5" cy="-44" r="11" fill={C.navy} />
        <rect x="-52" y="-92" width="104" height="26" rx="13" fill={C.white} />
        <text y="-74" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="17" fontWeight="700" fill={C.navy}>
          Killa Wasi
        </text>
      </g>
      {/* Norte */}
      <g transform="translate(560 400)" fontFamily="DM Sans, sans-serif" fontSize="13" fontWeight="700" fill={C.navy}>
        <circle r="18" fill={C.white} />
        <path d="M0 -12 L6 4 L0 0 L-6 4 Z" fill={C.navy} />
        <text y="32" textAnchor="middle">N</text>
      </g>
    </svg>
  )
}

export default function Location() {
  const { t, lang } = useHotel()

  return (
    <section id="ubicacion" className="h-section h-section--stone hloc" aria-labelledby="hloc-title">
      <div className="h-container hloc__grid">
        <motion.div
          className="hloc__map-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <MapIllustration label={t.location.mapLabel} />
        </motion.div>

        <div className="hloc__info">
          <p className="h-eyebrow hloc__eyebrow">{t.location.eyebrow}</p>
          <h2 id="hloc-title" className="h-title">
            {t.location.title}
          </h2>
          <p className="h-lead">{t.location.text}</p>
          <p className="hloc__address">
            <HotelIcon name="pin" />
            {t.location.address}
          </p>

          <ul className="hloc__distances">
            {distances.map((d) => (
              <li key={d.place.es}>
                <HotelIcon name={d.mode === 'car' ? 'car' : 'walk'} />
                <span className="hloc__place">{d.place[lang]}</span>
                <span className="hloc__time">
                  {d.minutes} min {d.mode === 'car' ? t.location.car : t.location.walk}
                </span>
              </li>
            ))}
          </ul>

          <a className="h-btn h-btn--navy" href={hotel.mapsUrl} target="_blank" rel="noopener noreferrer">
            <HotelIcon name="pin" />
            {t.location.directions}
          </a>
        </div>
      </div>
    </section>
  )
}
