import { motion } from 'framer-motion'
import './PageHero.css'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Portada corta en morado para las páginas internas (Nosotros, Proyectos, 404…).
 * Así el encabezado transparente con logo blanco se ve igual que en el inicio.
 */
export default function PageHero({ eyebrow, title, lead, titleId, art, children, className = '' }) {
  return (
    <section className={`page-hero ${className}`.trim()} aria-labelledby={titleId}>
      <div className="container page-hero__inner">
        <motion.div className="page-hero__copy" variants={container} initial="hidden" animate="show">
          {art && (
            <motion.div className="page-hero__art" variants={item}>
              {art}
            </motion.div>
          )}
          {eyebrow && (
            <motion.p className="page-hero__eyebrow" variants={item}>
              {eyebrow}
            </motion.p>
          )}
          <motion.h1 id={titleId} className="page-hero__title" variants={item}>
            {title}
          </motion.h1>
          {lead && (
            <motion.p className="page-hero__lead" variants={item}>
              {lead}
            </motion.p>
          )}
          {children && <motion.div variants={item}>{children}</motion.div>}
        </motion.div>
      </div>
    </section>
  )
}
