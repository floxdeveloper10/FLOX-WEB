import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import './Faq.css'

function FaqItem({ item, open, onToggle }) {
  const id = useId()
  const buttonId = `${id}-q`
  const panelId = `${id}-a`

  return (
    <li className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="faq__q">
        <button id={buttonId} type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          {item.q}
          <svg viewBox="0 0 24 24" className="icon faq__chevron" aria-hidden="true" focusable="false">
            <path d="m6 9.5 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="faq__a"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

/**
 * Preguntas frecuentes en acordeón (la primera abierta). Se usa en /apps y en cada rubro.
 * items: [{ q, a }]
 */
export default function Faq({ id, eyebrow, title, items, className = 'section--crema' }) {
  const headingId = `${id}-titulo`
  const [open, setOpen] = useState(0)

  return (
    <section id={id} className={`section faq ${className}`} aria-labelledby={headingId}>
      <div className="container faq__inner">
        <SectionHeading id={headingId} eyebrow={eyebrow} title={title} />
        <ul className="faq__list">
          {items.map((item, i) => (
            <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
