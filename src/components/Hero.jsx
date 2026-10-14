import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Chakana from './brand/Chakana.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { site } from '../data/site.js'
import './Hero.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const anim = reduceMotion ? {} : { variants: container, initial: 'hidden', animate: 'show' }
  const child = reduceMotion ? {} : { variants: item }

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <motion.div className="hero__copy" {...anim}>
          <motion.p className="hero__eyebrow" {...child}>
            Tecnología hecha en Cusco
          </motion.p>

          <motion.h1 id="hero-title" className="hero__title" {...child}>
            Vende más y <span className="hero__highlight">pierde menos</span>
          </motion.h1>

          <motion.p className="hero__subtitle" {...child}>
            con tecnología sencilla para tu negocio
          </motion.p>

          <motion.div className="hero__actions" {...child}>
            <a className="btn btn--primary hero__cta" href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Pide tu demo gratis por WhatsApp
            </a>
            <Link className="btn btn--ghost" to="/demo">
              Ver cómo funciona
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <Chakana animated className="hero__chakana" />
        </div>
      </div>
    </section>
  )
}
