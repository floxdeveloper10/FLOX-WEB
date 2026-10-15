import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

const ROUTE = 'M48 128 H118 V86 H196 V44 H252'

// Mapa ilustrado del delivery: el motorizado avanza por la ruta mientras el pedido va "En camino"
export default function RouteMap({ status, address }) {
  const pathRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [point, setPoint] = useState({ x: 48, y: 128 })
  const target = status === 'entregado' ? 1 : status === 'salida' ? 0.86 : 0
  const progress = useRef(0)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return undefined
    const length = path.getTotalLength()
    const place = (v) => {
      progress.current = v
      const p = path.getPointAtLength(v * length)
      setPoint({ x: p.x, y: p.y })
    }
    if (reduceMotion) {
      place(target)
      return undefined
    }
    const duration = status === 'salida' ? 14 : 1.2
    const controls = animate(progress.current, target, { duration, ease: status === 'salida' ? 'linear' : 'easeOut', onUpdate: place })
    return () => controls.stop()
  }, [target, status, reduceMotion])

  return (
    <figure className="qmap">
      <svg viewBox="0 0 300 170" role="img" aria-label={`Mapa del recorrido hasta ${address}`}>
        <rect width="300" height="170" fill="#EFE6D2" />
        {/* manzanas */}
        {[
          [14, 12, 86, 56],
          [126, 12, 60, 24],
          [210, 60, 76, 52],
          [14, 92, 22, 64],
          [62, 92, 46, 26],
          [140, 104, 146, 54],
          [126, 50, 60, 24],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="6" fill="#E2D5BA" />
        ))}
        <path d="M0 150 C60 140 90 160 150 152 S250 140 300 150" stroke="#BFD8DF" strokeWidth="9" fill="none" />
        <rect x="204" y="12" width="30" height="22" rx="5" fill="#C9DBB1" />
        <circle cx="219" cy="23" r="6" fill="#5C7A3A" opacity="0.6" />
        {/* ruta */}
        <path d={ROUTE} stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path ref={pathRef} d={ROUTE} stroke="#A63A1E" strokeWidth="3" strokeDasharray="5 6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* restaurante */}
        <g transform="translate(48 128)">
          <circle r="11" fill="#3B2418" />
          <path d="M-5 -1h10l-1.2 5a1.5 1.5 0 0 1-1.5 1.1h-4.6A1.5 1.5 0 0 1-3.8 4Z" fill="#FFF4E2" />
          <path d="M-6 -2h12" stroke="#FFF4E2" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        {/* casa */}
        <g transform="translate(252 44)">
          <circle r="12" fill="#5C7A3A" />
          <path d="M-6 1 0 -5l6 6M-4 0v6h8v-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* motorizado */}
        <g transform={`translate(${point.x} ${point.y})`}>
          <circle r="13" fill="#A63A1E" stroke="#fff" strokeWidth="3" />
          <g stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(-7 -6) scale(0.58)">
            <circle cx="6" cy="17" r="3" />
            <circle cx="18" cy="17" r="3" />
            <path d="M6 17h5l3-6h3l1 6M10 11h4M15 7.5h2.5" />
          </g>
        </g>
      </svg>
      <figcaption className="qmap__caption">Entrega en {address}</figcaption>
    </figure>
  )
}
