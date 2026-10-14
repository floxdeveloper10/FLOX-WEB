import { useId } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAgencia } from '../../agenciaState.js'

// Montañas en capas con parallax suave y un sendero que se dibuja subiendo a la cumbre.
export default function HeroMountains() {
  const uid = useId().replace(/:/g, '')
  const { reduceMotion } = useAgencia()
  const { scrollY } = useScroll()
  const move = (amount) => (reduceMotion ? 0 : amount)
  const sunY = useTransform(scrollY, [0, 800], [0, move(200)])
  const farY = useTransform(scrollY, [0, 800], [0, move(140)])
  const midY = useTransform(scrollY, [0, 800], [0, move(80)])
  const nearY = useTransform(scrollY, [0, 800], [0, move(30)])

  return (
    <svg className="ahero__scene" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`cielo-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E7A26B" />
          <stop offset="0.45" stopColor="#F2C98A" />
          <stop offset="1" stopColor="#F4EBDD" />
        </linearGradient>
        <linearGradient id={`lectura-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1E1E1E" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#1E1E1E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#cielo-${uid})`} />

      <motion.g style={{ y: sunY }}>
        <circle cx="1180" cy="300" r="170" fill="#F2B33D" opacity="0.25" />
        <circle cx="1180" cy="300" r="95" fill="#F2B33D" />
      </motion.g>

      {/* Cóndores */}
      <g fill="none" stroke="#5A3A2A" strokeWidth="4" strokeLinecap="round" opacity="0.7">
        <path d="M900 200 q18 -14 36 0 q18 -14 36 0" />
        <path d="M990 250 q12 -10 24 0 q12 -10 24 0" />
      </g>

      {/* Cordillera lejana con nevados */}
      <motion.g style={{ y: farY }}>
        <path d="M0 620 L180 420 L300 520 L470 330 L640 500 L800 380 L960 520 L1140 360 L1300 490 L1460 400 L1600 470 V1000 H0 Z" fill="#C88A6A" />
        <path d="M1100 405 L1140 360 L1182 410 L1162 400 L1140 418 L1118 400 Z" fill="#FFFFFF" />
      </motion.g>

      {/* Cerros medios (terracota) */}
      <motion.g style={{ y: midY }}>
        <path d="M0 720 L220 540 L420 680 L640 520 L860 690 L1080 560 L1300 700 L1600 560 V1000 H0 Z" fill="#C2502E" />
        <path d="M640 520 L860 690 L780 690 L640 560 Z" fill="#9E3D20" opacity="0.6" />
        {/* Sendero en zigzag que sube hasta la cumbre */}
        <motion.path
          d="M1190 720 L1050 680 L1140 645 L1040 612 L1110 585 L1080 562"
          fill="none"
          stroke="#F4EBDD"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.5, ease: 'easeInOut' }}
        />
        <circle cx="1080" cy="556" r="9" fill="#F2B33D" />
      </motion.g>

      {/* Ladera verde */}
      <motion.g style={{ y: nearY }}>
        <path d="M0 820 C240 720 480 760 720 700 C980 640 1240 760 1600 690 V1000 H0 Z" fill="#2F5D50" />
        <path d="M0 900 C300 860 700 900 1000 870 S1400 860 1600 880 V1000 H0 Z" fill="#234840" />
      </motion.g>

      <rect width="1600" height="1000" fill={`url(#lectura-${uid})`} />
    </svg>
  )
}
