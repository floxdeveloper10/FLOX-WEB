import { motion } from 'framer-motion'
import Phone from '../demo/Phone.jsx'
import WhatsAppIcon from '../WhatsAppIcon.jsx'
import AppScreen from './AppScreens.jsx'
import { whatsappLink } from '../../data/site.js'
import { appsPage } from '../../data/apps.js'
import '../PageHero.css'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// Los 3 celulares en perspectiva: cada uno flota con su propio ritmo
// (con "reducir movimiento" se quedan quietos).
const PHONES = [
  { app: 'app-restaurante', tone: '#FFF4E2', text: 'dark', className: 'apps-hero__phone--left', float: 5.5, delay: 0.2 },
  { app: 'app-gym', tone: '#0F0F10', className: 'apps-hero__phone--center', float: 6.5, delay: 0 },
  { app: 'app-inventario', tone: '#0E4C5A', className: 'apps-hero__phone--right', float: 6, delay: 0.4 },
]

export default function AppsHero() {
  const { hero } = appsPage

  return (
    <section className="page-hero apps-hero" aria-labelledby="apps-titulo">
      <div className="container apps-hero__inner">
        <motion.div className="apps-hero__copy" variants={container} initial="hidden" animate="show">
          <motion.p className="page-hero__eyebrow" variants={item}>
            {hero.eyebrow}
          </motion.p>
          <motion.h1 id="apps-titulo" className="page-hero__title apps-hero__title" variants={item}>
            {hero.title}
          </motion.h1>
          <motion.p className="page-hero__lead apps-hero__lead" variants={item}>
            {hero.lead}
          </motion.p>
          <motion.div className="apps-hero__actions" variants={item}>
            <a className="btn btn--primary" href={whatsappLink(hero.message)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {hero.cta}
            </a>
            <a className="btn btn--ghost" href="#apps-de-ejemplo">
              {hero.secondary}
            </a>
          </motion.div>
        </motion.div>

        <div className="apps-hero__stage" aria-hidden="true">
          {PHONES.map((p, i) => (
            <motion.div
              key={p.app}
              className={`apps-hero__phone ${p.className}`}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: p.float, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Phone size="sm" decorative statusTone={p.tone} statusText={p.text}>
                  <AppScreen app={p.app} className="apps-screen" />
                </Phone>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
