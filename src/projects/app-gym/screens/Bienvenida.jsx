import { motion } from 'framer-motion'
import PumaLogo from '../components/PumaLogo.jsx'
import { gym } from '../gym.data.js'
import { useGym } from '../gymState.js'

// Pantalla de bienvenida: logo animado y un solo botón (sin usuario ni contraseña)
export default function Bienvenida() {
  const { enter } = useGym()
  const rise = (delay) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5 } })

  return (
    <div className="gwelcome">
      <div className="gwelcome__glow" aria-hidden="true" />
      <div className="gwelcome__brand">
        <PumaLogo animated className="gwelcome__logo" />
        <motion.p className="gwelcome__name" {...rise(1.2)}>
          {gym.name}
        </motion.p>
        <motion.p className="gwelcome__tagline" {...rise(1.35)}>
          {gym.tagline} · {gym.city}
        </motion.p>
      </div>
      <motion.div className="gwelcome__actions" {...rise(1.5)}>
        <button type="button" className="gbtn gbtn--primary gbtn--block" onClick={enter}>
          Entrar como demo
        </button>
        <p className="gwelcome__note">Demo: sin usuario ni contraseña</p>
      </motion.div>
    </div>
  )
}
