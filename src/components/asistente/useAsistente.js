import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { asistente, asistenteUi } from '../../data/asistente.js'
import { whatsappLink } from '../../data/site.js'

const TYPING_MS = 750
const TYPING_MS_REDUCED = 350

let nextId = 1

// Conversación del asistente: recorre el árbol de src/data/asistente.js.
// Cada respuesta del asistente aparece después de "escribiendo...".
export default function useAsistente() {
  const reduceMotion = useReducedMotion()
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [nodeId, setNodeId] = useState(null)
  // Lo que eligió (para el resumen que se envía por WhatsApp)
  const [chosen, setChosen] = useState([])
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const go = useCallback(
    (to, userLabel) => {
      const node = asistente.nodes[to]
      if (!node) return
      timers.current.forEach(clearTimeout)
      timers.current = []
      if (userLabel) setMessages((list) => [...list, { id: nextId++, from: 'user', text: userLabel }])
      setNodeId(null)
      setTyping(true)
      const delay = reduceMotion ? TYPING_MS_REDUCED : TYPING_MS
      node.messages.forEach((text, i) => {
        const last = i === node.messages.length - 1
        timers.current.push(
          setTimeout(() => {
            setMessages((list) => [...list, { id: nextId++, from: 'bot', text, links: last ? node.links : undefined }])
            if (last) {
              setTyping(false)
              setNodeId(to)
            }
          }, delay * (i + 1)),
        )
      })
    },
    [reduceMotion],
  )

  const start = useCallback(() => {
    if (messages.length === 0 && !typing) go(asistente.start)
  }, [go, messages.length, typing])

  // Respuesta rápida elegida por el visitante
  const choose = useCallback(
    (reply) => {
      const label = reply.userLabel ?? reply.label
      setChosen((list) => (list.includes(label) ? list : [...list, label]))
      go(reply.to, label)
    },
    [go],
  )

  const restart = useCallback(() => go(asistente.start, asistenteUi.restart), [go])

  // "Hablar con una persona": el enlace abre WhatsApp y el asistente lo confirma en el chat
  const talked = useCallback(() => go('persona', asistenteUi.talk), [go])

  const summary = [
    asistenteUi.whatsappIntro,
    chosen.length ? `${asistenteUi.whatsappChosen} ${chosen.join(', ')}.` : 'Quiero más información para mi negocio.',
  ].join(' ')

  const node = nodeId ? asistente.nodes[nodeId] : null
  const replies = node ? (node.replies ?? asistente.nodes[asistente.start].replies) : []

  return {
    messages,
    typing,
    replies,
    whatsappHref: whatsappLink(summary),
    start,
    choose,
    restart,
    talked,
  }
}
