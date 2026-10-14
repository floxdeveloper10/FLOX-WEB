import { Link, useParams } from 'react-router-dom'
import AgenciaIcon from '../components/AgenciaIcon.jsx'
import TourImage from '../components/TourImage.jsx'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { findTour, to } from '../utils.js'
import NoEncontrado from './NoEncontrado.jsx'

// /tours/:id → por ahora "Detalle en construcción" (se completa en la parte 2)
export default function TourDetalle() {
  const { id } = useParams()
  const { t, lang } = useAgencia()
  const tour = findTour(id)
  useAgenciaTitle(tour ? tour.name[lang] : t.pageTitle.notFound)

  if (!tour) return <NoEncontrado />

  return (
    <section className="adetail" aria-labelledby="adetail-title">
      <div className="adetail__media">
        <TourImage tour={tour} lang={lang} className="adetail__img" eager />
      </div>
      <div className="a-container adetail__box">
        <span className="adetail__badge">
          <span className="adetail__stripes" aria-hidden="true" />
          {t.detail.title}
        </span>
        <h1 id="adetail-title" className="a-title">
          {tour.name[lang]}
        </h1>
        <p className="a-lead">{t.detail.text}</p>
        <Link to={to('/tours')} className="a-btn a-btn--primary">
          <AgenciaIcon name="back" />
          {t.detail.back}
        </Link>
      </div>
    </section>
  )
}
