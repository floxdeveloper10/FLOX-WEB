import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AgenciaIcon from './AgenciaIcon.jsx'
import Difficulty from './Difficulty.jsx'
import TourImage from './TourImage.jsx'
import { useAgencia } from '../agenciaState.js'
import { categoryOf, durationLabel, to } from '../utils.js'

// Tarjeta de un tour. El nombre es el enlace y cubre toda la tarjeta;
// el corazón queda por encima para guardar en favoritos.
export default function TourCard({ tour, headingLevel = 'h3', showSummary = true }) {
  const { t, lang, price, isFavorite, toggleFavorite } = useAgencia()
  const Heading = headingLevel
  const fav = isFavorite(tour.id)
  const name = tour.name[lang]
  const discount = tour.oldPrice ? Math.round((1 - tour.price / tour.oldPrice) * 100) : 0

  return (
    <article className="atour">
      <div className="atour__media">
        <TourImage tour={tour} lang={lang} className="atour__img" />
        <span className="atour__cat">{categoryOf(tour.category).label[lang]}</span>
        {tour.oldPrice && (
          <span className="atour__offer">
            {t.card.offer} −{discount}%
          </span>
        )}
        <button
          type="button"
          className={`atour__fav ${fav ? 'is-on' : ''}`}
          aria-pressed={fav}
          aria-label={fav ? t.card.removeFav(name) : t.card.addFav(name)}
          onClick={() => toggleFavorite(tour.id)}
        >
          <motion.span key={String(fav)} initial={{ scale: fav ? 0.5 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 14 }}>
            <AgenciaIcon name="heart" filled={fav} />
          </motion.span>
        </button>
      </div>

      <div className="atour__body">
        <Heading className="atour__name">
          <Link to={to(`/tours/${tour.id}`)} className="atour__link">
            {name}
          </Link>
        </Heading>
        {showSummary && <p className="atour__summary">{tour.summary[lang]}</p>}

        <ul className="atour__meta">
          <li>
            <AgenciaIcon name="clock" />
            {durationLabel(tour, t)}
          </li>
          <li>
            <Difficulty id={tour.difficulty} />
          </li>
          <li title={t.card.altitude}>
            <AgenciaIcon name="mountain" />
            {new Intl.NumberFormat(t.locale).format(tour.altitude)} m
            <span className="a-visually-hidden"> ({t.card.altitude})</span>
          </li>
        </ul>

        <div className="atour__footer">
          <p className="atour__price">
            <span className="atour__from">{t.card.from}</span>
            <strong>{price(tour.price)}</strong>
            {tour.oldPrice && (
              <del className="atour__old">
                <span className="a-visually-hidden">{t.card.before}: </span>
                {price(tour.oldPrice)}
              </del>
            )}
            <span className="atour__per">{t.card.perPerson}</span>
          </p>
          <span className="atour__view" aria-hidden="true">
            {t.card.view}
            <AgenciaIcon name="arrow" />
          </span>
        </div>
      </div>
    </article>
  )
}
