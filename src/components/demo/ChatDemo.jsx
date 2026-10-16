import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Phone from './Phone.jsx'
import ChatAvatar from './ChatAvatar.jsx'
import { restaurant } from '../../data/carta.js'
import './ChatDemo.css'

// Tiempos de la conversación (ms)
const GUEST_DELAY = 1100 // pausa antes de que el turista envíe
const FIRST_DELAY = 500 // pausa antes del primer mensaje
const BOT_PAUSE = 450 // pausa antes de que el bot empiece a escribir
const BOT_TYPING = 1400 // tiempo de "escribiendo..."
const BOT_TYPING_SHORT = 900 // cuando el bot manda dos mensajes seguidos

function MiniMap() {
  return (
    <svg viewBox="0 0 240 110" className="chat__map" aria-hidden="true" focusable="false">
      <rect width="240" height="110" fill="#E9EFE2" />
      <rect x="150" y="8" width="70" height="40" rx="6" fill="#C9E3B8" />
      <path d="M-5 92 C 50 70, 90 105, 140 80 S 220 60, 250 74" fill="none" stroke="#A9D4F0" strokeWidth="9" />
      <g stroke="#fff" strokeLinecap="round">
        <path d="M0 40 H240" strokeWidth="8" />
        <path d="M70 0 V110" strokeWidth="8" />
        <path d="M0 18 L130 70" strokeWidth="5" />
        <path d="M180 48 V110" strokeWidth="5" />
      </g>
      <g transform="translate(108 18)">
        <path d="M12 34 C 12 34 0 21 0 12 a12 12 0 0 1 24 0 c0 9 -12 22 -12 22Z" fill="#E53935" />
        <circle cx="12" cy="12" r="4.5" fill="#fff" />
      </g>
    </svg>
  )
}

function Ticks() {
  return (
    <svg viewBox="0 0 18 11" className="chat__ticks" aria-hidden="true" focusable="false">
      <path d="M1 6l3 3 6-7M6.5 8.5l.5.5 6-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Bubble({ message, animate, contact, lang }) {
  const isGuest = message.from === 'guest'
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 10, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }
    : {}

  return (
    <motion.li
      className={`chat__bubble chat__bubble--${isGuest ? 'guest' : 'bot'} ${message.type === 'location' ? 'chat__bubble--location' : ''}`}
      {...motionProps}
    >
      {message.type === 'location' ? (
        <div className="chat__location">
          <MiniMap />
          <p className="chat__location-text">
            <strong>{contact.name}</strong> · {contact.place}
          </p>
        </div>
      ) : (
        <span lang={lang}>{message.text}</span>
      )}
      <span className="chat__meta">
        {message.time}
        {isGuest && <Ticks />}
      </span>
    </motion.li>
  )
}

// Chat de WhatsApp que se escribe solo al aparecer en pantalla (una vez) y se puede repetir.
// chat: el guion (mensajes y textos). Sin contact, es el de la Picantería Qhapaq (en inglés).
export default function ChatDemo({ chat, label }) {
  const { messages } = chat
  const contact = chat.contact ?? { name: restaurant.name, place: restaurant.place, avatar: 'restaurant' }
  const lang = chat.lang ?? 'en'
  const reduceMotion = useReducedMotion()
  const rootRef = useRef(null)
  const scrollRef = useRef(null)
  const inView = useInView(rootRef, { once: true, amount: 0.45 })

  const [run, setRun] = useState(0)
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(false)

  // Sin animación (reducir movimiento) se muestra toda la conversación de inmediato
  const shown = reduceMotion ? messages.length : visible

  useEffect(() => {
    if (!inView || reduceMotion) return undefined
    let cancelled = false
    const timers = []
    const wait = (ms) => new Promise((resolve) => timers.push(setTimeout(resolve, ms)))

    async function play() {
      setVisible(0)
      setTyping(false)
      await wait(FIRST_DELAY)
      for (let i = 0; i < messages.length; i++) {
        if (cancelled) return
        const message = messages[i]
        if (message.from === 'bot') {
          const followsBot = messages[i - 1]?.from === 'bot'
          await wait(BOT_PAUSE)
          if (cancelled) return
          setTyping(true)
          await wait(followsBot ? BOT_TYPING_SHORT : BOT_TYPING)
          if (cancelled) return
          setTyping(false)
        } else if (i > 0) {
          await wait(GUEST_DELAY)
        }
        if (cancelled) return
        setVisible(i + 1)
      }
    }

    play()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [inView, reduceMotion, run, messages])

  // Mantener visible el último mensaje (scroll solo dentro del chat, no de la página)
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [shown, typing, reduceMotion])

  return (
    <div ref={rootRef} className="chat-demo">
      <Phone statusTone="#075E54" label={label}>
        <div className="chat">
          <header className="chat__header">
            <svg viewBox="0 0 24 24" className="chat__back" aria-hidden="true" focusable="false">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <ChatAvatar avatar={contact.avatar} size={36} />
            <div className="chat__contact">
              <p className="chat__name">{contact.name}</p>
              <p className="chat__status">
                {typing ? chat.typing : chat.online}
              </p>
            </div>
          </header>

          <div ref={scrollRef} className="chat__body">
            <ul className="chat__list" aria-label={label}>
              {messages.slice(0, shown).map((message, i) => (
                <Bubble key={`${run}-${i}`} message={message} animate={!reduceMotion} contact={contact} lang={lang} />
              ))}
              {typing && (
                <motion.li
                  className="chat__bubble chat__bubble--bot chat__typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  aria-label={chat.typing}
                >
                  <span />
                  <span />
                  <span />
                </motion.li>
              )}
            </ul>
          </div>

          <div className="chat__input" aria-hidden="true">
            <span className="chat__field">{lang === 'es' ? 'Mensaje' : 'Message'}</span>
            <span className="chat__mic">
              <svg viewBox="0 0 24 24">
                <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </Phone>

      <p className="chat-demo__note">{chat.note}</p>
      <button type="button" className="btn btn--ghost btn--sm chat-demo__replay" onClick={() => setRun((r) => r + 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {chat.replay}
      </button>
    </div>
  )
}
