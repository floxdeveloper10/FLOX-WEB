import { useParams, useSearchParams } from 'react-router-dom'
import TourCard from '../components/TourCard.jsx'
import TourHero from '../components/detail/TourHero.jsx'
import TourGallery from '../components/detail/TourGallery.jsx'
import TourSections from '../components/detail/TourSections.jsx'
import BookingBox from '../components/detail/BookingBox.jsx'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { tours } from '../agencia.data.js'
import { findTour } from '../utils.js'
import { useBooking } from '../useBooking.js'
import NoEncontrado from './NoEncontrado.jsx'

// 3 tours de la misma categoría (si no alcanzan, se completan con los más recomendados)
function relatedTours(tour) {
  const same = tours.filter((x) => x.id !== tour.id && x.category === tour.category)
  const others = tours.filter((x) => x.id !== tour.id && x.category !== tour.category).sort((a, b) => a.rank - b.rank)
  return [...same, ...others].slice(0, 3)
}

function Booking({ tour, editKey }) {
  const { booking, setBooking, editing } = useBooking(tour, editKey)
  return <BookingBox tour={tour} booking={booking} setBooking={setBooking} editing={editing} />
}

export default function TourDetalle() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { t, lang } = useAgencia()
  const tour = findTour(id)
  useAgenciaTitle(tour ? tour.name[lang] : t.pageTitle.notFound)

  if (!tour) return <NoEncontrado />
  const editKey = params.get('editar') ?? ''

  return (
    <>
      <TourHero tour={tour} />
      <div className="a-container addetail">
        <div className="addetail__main">
          <TourGallery tour={tour} />
          <TourSections tour={tour} />
        </div>
        {/* Se vuelve a crear al entrar o salir del modo edición para cargar los datos correctos */}
        <Booking key={`${tour.id}-${editKey}`} tour={tour} editKey={editKey} />
      </div>

      <section className="a-section adrelated" aria-labelledby="adrelated-title">
        <div className="a-container">
          <h2 id="adrelated-title" className="a-title adrelated__title">
            {t.tour.related}
          </h2>
          <ul className="adrelated__list">
            {relatedTours(tour).map((x) => (
              <li key={x.id}>
                <TourCard tour={x} showSummary={false} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
