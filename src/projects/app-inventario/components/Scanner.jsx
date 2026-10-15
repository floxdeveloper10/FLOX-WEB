import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import IIcon from './IIcon.jsx'

// "Escanear código" SIMULADO: no usa la cámara. Una línea láser recorre el visor
// y a los 1.5 s "detecta" un producto al azar.
export default function Scanner({ products, onDetect, onClose }) {
  const [found, setFound] = useState(null)
  const ref = useRef(null)

  // Las funciones más recientes, sin reiniciar la simulación en cada render
  const latest = useRef({ products, onDetect })
  useEffect(() => {
    latest.current = { products, onDetect }
  })

  useEffect(() => {
    ref.current?.querySelector('button')?.focus({ preventScroll: true })
    let detect
    const timer = setTimeout(() => {
      const list = latest.current.products
      const product = list[Math.floor(Math.random() * list.length)]
      setFound(product)
      detect = setTimeout(() => latest.current.onDetect(product), 900)
    }, 1500)
    return () => {
      clearTimeout(timer)
      clearTimeout(detect)
    }
  }, [])

  return (
    <motion.div
      className="iscan"
      role="dialog"
      aria-modal="true"
      aria-label="Escanear código (simulado)"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          onClose()
        }
        if (e.key === 'Tab') e.preventDefault()
      }}
    >
      <div className={`iscan__view ${found ? 'is-found' : ''}`}>
        <span className="iscan__corner iscan__corner--tl" />
        <span className="iscan__corner iscan__corner--tr" />
        <span className="iscan__corner iscan__corner--bl" />
        <span className="iscan__corner iscan__corner--br" />
        <svg viewBox="0 0 120 50" className="iscan__barcode" aria-hidden="true">
          {[2, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 2, 4, 1, 3, 1, 2, 3].reduce(
            (acc, w, i) => {
              const x = acc.x
              acc.x += w + 2
              if (i % 2 === 0) acc.bars.push(<rect key={i} x={x} y="0" width={w} height="50" fill="#0b2a31" />)
              return acc
            },
            { x: 4, bars: [] },
          ).bars}
        </svg>
        {!found && <span className="iscan__laser" aria-hidden="true" />}
      </div>
      <p className="iscan__text" role="status">
        {found ? (
          <>
            <IIcon name="check" strokeWidth={3} /> Detectado: <strong>{found.name}</strong>
          </>
        ) : (
          'Buscando código de barras…'
        )}
      </p>
      <p className="iscan__note">Simulación: en la app real se usa la cámara del celular.</p>
      <button type="button" className="ibtn ibtn--ghost-light" onClick={onClose}>
        Cancelar
      </button>
    </motion.div>
  )
}
