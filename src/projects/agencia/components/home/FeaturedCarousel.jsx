import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AgenciaIcon from '../AgenciaIcon.jsx'
import TourCard from '../TourCard.jsx'
import { useAgencia } from '../../agenciaState.js'
import { tours } from '../../agencia.data.js'
import { to } from '../../utils.js'

const featured = tours.filter((t) => t.featured).sort((a, b) => a.rank - b.rank)

// Carrusel: en el celular se desliza con el dedo (scroll nativo que encaja en cada tarjeta);
// en escritorio, flechas que se desactivan en los extremos.
export default function FeaturedCarousel() {
  const { t, reduceMotion } = useAgencia()
  const trackRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scroll = (dir) => {
    const el = trackRef.current
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section className="a-section afeat" aria-labelledby="afeat-title">
      <div className="a-container">
        <div className="afeat__head">
          <div className="a-heading">
            <p className="a-eyebrow">{t.featured.eyebrow}</p>
            <h2 id="afeat-title" className="a-title">
              {t.featured.title}
            </h2>
          </div>
          <div className="afeat__arrows">
            <button type="button" className="afeat__arrow" onClick={() => scroll(-1)} disabled={edges.start} aria-label={t.featured.prev}>
              <AgenciaIcon name="prev" />
            </button>
            <button type="button" className="afeat__arrow" onClick={() => scroll(1)} disabled={edges.end} aria-label={t.featured.next}>
              <AgenciaIcon name="next" />
            </button>
          </div>
        </div>
      </div>

      <ul ref={trackRef} className="afeat__track" onScroll={update}>
        {featured.map((tour) => (
          <li key={tour.id} className="afeat__item">
            <TourCard tour={tour} showSummary={false} />
          </li>
        ))}
      </ul>

      <div className="a-container afeat__all">
        <Link to={to('/tours')} className="a-btn a-btn--green">
          {t.featured.all}
          <AgenciaIcon name="arrow" />
        </Link>
      </div>
    </section>
  )
}
