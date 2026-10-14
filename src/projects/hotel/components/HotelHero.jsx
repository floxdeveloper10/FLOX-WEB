import { useId } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SearchForm from './SearchForm.jsx'
import { HOTEL_COLORS as C } from '../palette.js'
import { useHotel } from '../hotelState.js'
import './HotelHero.css'

// Techos de teja de San Blas: casas escalonadas en la ladera, con ventanas encendidas.
function RoofRow({ y, step, count, base, tone, lit, seed }) {
  return Array.from({ length: count }, (_, i) => {
    const x = i * step - 20
    const h = 46 + ((i * seed) % 5) * 10
    const top = y - ((i * (seed + 3)) % 4) * 8
    const w = step + 6
    const roof = (i + seed) % 3 === 0 ? C.tileDark : C.tile
    return (
      <g key={i}>
        <rect x={x} y={top} width={w} height={h + base} fill={tone[(i + seed) % tone.length]} />
        <polygon points={`${x - 8},${top + 4} ${x + w / 2},${top - 22} ${x + w + 8},${top + 4}`} fill={roof} />
        <path d={`M${x - 4} ${top + 1} L${x + w / 2} ${top - 19} L${x + w + 4} ${top + 1}`} fill="none" stroke="#B87457" strokeWidth="1.2" opacity="0.5" />
        {lit && (i + seed) % 2 === 0 && <rect x={x + w * 0.38} y={top + 16} width={w * 0.2} height="16" fill={C.goldLight} opacity="0.95" />}
        {lit && (i + seed) % 5 === 1 && <rect x={x + w * 0.12} y={top + 30} width={w * 0.16} height="14" fill={C.goldLight} opacity="0.8" />}
      </g>
    )
  })
}

function HeroScene() {
  const uid = useId().replace(/:/g, '')
  const { reduceMotion } = useHotel()
  const { scrollY } = useScroll()
  // Parallax suave: lo lejano baja más despacio que lo cercano
  const moonY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 220])
  const farY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 150])
  const midY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 90])
  const nearY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 35])

  return (
    <svg className="hhero__scene" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`cielo-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F1A2B" />
          <stop offset="0.55" stopColor={C.navy} />
          <stop offset="1" stopColor="#2F4366" />
        </linearGradient>
        <linearGradient id={`bruma-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F1A2B" stopOpacity="0" />
          <stop offset="1" stopColor="#0F1A2B" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id={`lectura-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0F1A2B" stopOpacity="0.7" />
          <stop offset="0.55" stopColor="#0F1A2B" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`halo-${uid}`}>
          <stop offset="0" stopColor={C.goldLight} stopOpacity="0.45" />
          <stop offset="1" stopColor={C.goldLight} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#cielo-${uid})`} />

      <g className="hhero__stars">
        {[[120, 90], [260, 160], [420, 70], [560, 200], [700, 110], [880, 60], [980, 180], [1180, 90], [1320, 170], [1480, 70], [1540, 240], [60, 260], [340, 300], [820, 280]].map(([x, y], i) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={i % 3 === 0 ? 2 : 1.3} fill="#fff" opacity={i % 2 ? 0.55 : 0.85} />
        ))}
      </g>

      {/* Luna (killa) */}
      <motion.g style={{ y: moonY }}>
        <circle cx="1150" cy="250" r="190" fill={`url(#halo-${uid})`} />
        <circle cx="1150" cy="250" r="78" fill={C.goldLight} />
        <circle cx="1186" cy="226" r="68" fill="#16233A" />
      </motion.g>

      {/* Apus: montañas lejanas con nieve */}
      <motion.g style={{ y: farY }}>
        <path d="M0 640 L160 470 L260 540 L420 380 L560 520 L700 430 L860 560 L1020 400 L1180 520 L1320 440 L1460 540 L1600 470 V1000 H0 Z" fill="#22324E" />
        <path d="M1000 420 L1020 400 L1042 424 L1030 420 L1020 430 Z" fill={C.stone} opacity="0.85" />
      </motion.g>

      {/* Cerros cercanos */}
      <motion.g style={{ y: midY }}>
        <path d="M0 720 C200 640 360 690 520 650 C700 610 840 690 1020 650 C1200 610 1380 680 1600 630 V1000 H0 Z" fill="#2A3C5E" />
        {/* Torre de la iglesia de San Blas (a la derecha, bajo la luna) */}
        <g transform="translate(1240 548)">
          <rect x="0" y="40" width="46" height="120" fill={C.stone2} />
          <rect x="6" y="10" width="34" height="34" fill={C.stone} />
          <path d="M3 10 L23 -14 L43 10 Z" fill={C.tileDark} />
          <path d="M16 22 a7 7 0 0 1 14 0 V40 H16 Z" fill="#1B2A41" />
          <rect x="21" y="-30" width="4" height="18" fill={C.stone} />
          <rect x="16" y="-24" width="14" height="4" fill={C.stone} />
        </g>
        <RoofRow y={700} step={70} count={25} base={200} tone={['#C9BFAE', '#BDB2A0']} lit seed={2} />
      </motion.g>

      {/* Techos en primer plano */}
      <motion.g style={{ y: nearY }}>
        <RoofRow y={830} step={96} count={19} base={200} tone={[C.stone, C.stone2]} lit seed={3} />
      </motion.g>

      {/* Sombra a la izquierda para leer el título y bruma abajo para el buscador */}
      <rect width="1600" height="1000" fill={`url(#lectura-${uid})`} />
      <rect y="640" width="1600" height="360" fill={`url(#bruma-${uid})`} />
    </svg>
  )
}

export default function HotelHero() {
  const { t } = useHotel()

  return (
    <section className="hhero" aria-labelledby="hhero-title">
      <HeroScene />
      <div className="h-container hhero__content">
        <motion.div
          className="hhero__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hhero__eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hhero-title" className="hhero__title">
            {t.hero.title}
          </h1>
          <p className="hhero__lead">{t.hero.lead}</p>
        </motion.div>
        <motion.div
          className="hhero__search"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SearchForm />
        </motion.div>
      </div>
    </section>
  )
}
