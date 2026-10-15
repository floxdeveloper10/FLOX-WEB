import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../SectionHeading.jsx'
import AppsIcon from './AppsIcon.jsx'
import { appsPage } from '../../data/apps.js'

function FaqItem({ item, open, onToggle }) {
  const id = useId()
  const buttonId = `${id}-q`
  const panelId = `${id}-a`

  return (
    <li className={`apps-faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="apps-faq__q">
        <button id={buttonId} type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          {item.q}
          <AppsIcon name="chevron" className="apps-faq__chevron" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="apps-faq__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

// Preguntas frecuentes en acordeón (la primera abierta)
export default function AppFaq() {
  const { faq } = appsPage
  const headingId = `${faq.id}-titulo`
  const [open, setOpen] = useState(0)

  return (
    <section id={faq.id} className="section section--crema apps-faq" aria-labelledby={headingId}>
      <div className="container apps-faq__inner">
        <SectionHeading id={headingId} eyebrow={faq.eyebrow} title={faq.title} />
        <ul className="apps-faq__list">
          {faq.items.map((item, i) => (
            <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
