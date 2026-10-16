import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Chakana from '../brand/Chakana.jsx'
import WhatsAppIcon from '../WhatsAppIcon.jsx'
import useAsistente from './useAsistente.js'
import { asistenteUi as ui } from '../../data/asistente.js'
import { local, session } from '../../projects/shared/safeStorage.js'
import './Asistente.css'

const AUTO_OPEN_MS = 25000
const AUTO_KEY = 'flox:asistente-auto' // sessionStorage: ya se abrió solo en esta visita
const CLOSED_KEY = 'flox:asistente-cerrado' // localStorage: el visitante lo cerró alguna vez
// Solo en escritorio (pantalla ancha y mouse); en el celular nunca se abre solo
const DESKTOP = '(min-width: 1024px) and (hover: hover) and (pointer: fine)'
const SMALL = '(max-width: 767px)'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="asis__x">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

// Texto con saltos de línea
const Lines = ({ text }) =>
  text.split('\n').map((line, i) => (
    <span key={i} className="asis__line">
      {line}
    </span>
  ))

// Asistente FLOX: botón con la chakana (reemplaza al botón flotante de WhatsApp) y panel de chat.
// hidden: en páginas donde no va (cotizador); la conversación se mantiene.
export default function Asistente({ hidden = false }) {
  const { pathname } = useLocation()
  const chat = useAsistente()
  const [open, setOpen] = useState(false)
  // Modal solo si lo abrió el visitante (si se abre solo, no se le quita el foco)
  const [modal, setModal] = useState(false)
  const panelRef = useRef(null)
  const launcherRef = useRef(null)
  const bodyRef = useRef(null)
  const titleId = useId()
  const { start } = chat

  const show = useCallback(
    (moveFocus) => {
      setOpen(true)
      setModal(moveFocus)
      start()
      // Al abrirlo el visitante, el foco entra al panel. Si se abre solo, no se le quita el foco.
      if (moveFocus) requestAnimationFrame(() => panelRef.current?.focus())
    },
    [start],
  )

  const close = useCallback((remember = true) => {
    setOpen(false)
    if (remember) local.set(CLOSED_KEY, true)
    if (panelRef.current?.contains(document.activeElement)) launcherRef.current?.focus()
  }, [])

  // En el cotizador no va: si estaba abierto, se cierra (sin contarlo como "lo cerró")
  const [wasHidden, setWasHidden] = useState(hidden)
  if (hidden !== wasHidden) {
    setWasHidden(hidden)
    if (hidden) setOpen(false)
  }

  // Se abre solo UNA vez por visita, a los 25 s en la página, solo en escritorio
  // y solo si nunca lo cerró
  useEffect(() => {
    if (hidden || open) return undefined
    if (!window.matchMedia?.(DESKTOP).matches) return undefined
    if (session.get(AUTO_KEY, false) || local.get(CLOSED_KEY, false)) return undefined
    const timer = setTimeout(() => {
      // No interrumpir si está escribiendo en un campo
      const el = document.activeElement
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
      session.set(AUTO_KEY, true)
      show(false)
    }, AUTO_OPEN_MS)
    return () => clearTimeout(timer)
  }, [pathname, hidden, open, show])

  // Escape cierra; Tab no sale del panel mientras el foco está dentro
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      const panel = panelRef.current
      if (!panel) return
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab' || !panel.contains(document.activeElement)) return
      const items = [...panel.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  // Al elegir una respuesta, sus botones desaparecen: el foco espera en el panel
  // y pasa a la primera respuesta nueva cuando aparecen
  const choose = (reply) => {
    panelRef.current?.focus({ preventScroll: true })
    chat.choose(reply)
  }
  useEffect(() => {
    const panel = panelRef.current
    if (panel && document.activeElement === panel && chat.replies.length) {
      panel.querySelector('.asis__reply')?.focus({ preventScroll: true })
    }
  }, [chat.replies])

  // Siempre mostrar lo último
  useEffect(() => {
    const body = bodyRef.current
    if (body) body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' })
  }, [chat.messages.length, chat.typing, chat.replies.length, open])

  // En el celular el panel ocupa casi toda la pantalla: al ir a otra página, se cierra
  const onNavigate = () => {
    if (window.matchMedia?.(SMALL).matches) close(false)
  }

  if (hidden) return null

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`asis-launcher ${open ? 'is-open' : ''}`}
        aria-label={open ? ui.close : ui.open}
        aria-expanded={open}
        aria-controls={open ? `${titleId}-panel` : undefined}
        onClick={() => (open ? close() : show(true))}
      >
        {!open && <span className="asis-launcher__pulse" aria-hidden="true" />}
        {open ? <CloseIcon /> : <Chakana className="asis-launcher__chakana" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={`${titleId}-panel`}
            className="asis"
            role="dialog"
            aria-modal={modal || undefined}
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="asis__header">
              <span className="asis__avatar" aria-hidden="true">
                <Chakana />
              </span>
              <span className="asis__who">
                <span id={titleId} className="asis__name">
                  {ui.name}
                </span>
                <span className="asis__status">
                  <span className="asis__dot" aria-hidden="true" />
                  {chat.typing ? ui.typing : ui.status}
                </span>
              </span>
              <button type="button" className="asis__close" onClick={() => close()} aria-label={ui.close}>
                <CloseIcon />
              </button>
            </header>

            <div ref={bodyRef} className="asis__body">
              <ol className="asis__log" role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversación">
                {chat.messages.map((m) => (
                  <motion.li
                    key={m.id}
                    className={`asis__msg asis__msg--${m.from}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="visually-hidden">{m.from === 'bot' ? `${ui.name}: ` : 'Tú: '}</span>
                    <Lines text={m.text} />
                    {m.links && (
                      <span className="asis__links">
                        {m.links.map((l) => (
                          <Link key={l.to} to={l.to} className="asis__link" onClick={onNavigate}>
                            {l.label}
                            <span aria-hidden="true">→</span>
                          </Link>
                        ))}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ol>

              {chat.typing && (
                <p className="asis__typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </p>
              )}

              {chat.replies.length > 0 && (
                <motion.div
                  className="asis__replies"
                  role="group"
                  aria-label={ui.repliesLabel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {chat.replies.map((r) => (
                    <button key={r.to} type="button" className="asis__reply" onClick={() => choose(r)}>
                      {r.label}
                    </button>
                  ))}
                  <a
                    className="asis__reply asis__reply--person"
                    href={chat.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-origen="asistente"
                    onClick={() => {
                      panelRef.current?.focus({ preventScroll: true })
                      chat.talked()
                    }}
                  >
                    {ui.talk}
                  </a>
                </motion.div>
              )}
            </div>

            <footer className="asis__footer">
              <button type="button" className="asis__restart" onClick={chat.restart}>
                {ui.restart}
              </button>
              <a
                className="asis__wa"
                href={chat.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-origen="asistente"
                aria-label={ui.whatsappLong}
              >
                <WhatsAppIcon />
                {ui.whatsapp}
              </a>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
