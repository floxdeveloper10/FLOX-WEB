import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AgenciaIcon from '../AgenciaIcon.jsx'
import Difficulty from '../Difficulty.jsx'
import TourImage from '../TourImage.jsx'
import { useAgencia } from '../../agenciaState.js'
import { categoryOf, durationLabel, to } from '../../utils.js'

// Compartir: menú nativo del celular si existe; si no, copiar el enlace
async function shareTour({ tour, t, lang, showToast }) {
  const url = window.location.href
  const touch = window.matchMedia('(pointer: coarse)').matches
  if (touch && navigator.share) {
    try {
      await navigator.share({ title: tour.name[lang], text: t.tour.shareText(tour.name[lang]), url })
    } catch {
      // El visitante cerró el menú de compartir: no pasa nada
    }
    return
  }
  try {
    await navigator.clipboard.writeText(url)
    showToast({ message: t.tour.copied })
  } catch {
    window.prompt(t.tour.copyFallback, url)
  }
}

export default function TourHero({ tour }) {
  const { t, lang, isFavorite, toggleFavorite, showToast } = useAgencia()
  const fav = isFavorite(tour.id)
  const name = tour.name[lang]
  const discount = tour.oldPrice ? Math.round((1 - tour.price / tour.oldPrice) * 100) : 0

  const facts = [
    { icon: 'clock', label: t.tour.duration, value: durationLabel(tour, t) },
    { icon: null, label: t.tour.difficulty, value: <Difficulty id={tour.difficulty} /> },
    { icon: 'mountain', label: t.tour.altitude, value: `${new Intl.NumberFormat(t.locale).format(tour.altitude)} m` },
    { icon: 'users', label: t.tour.group, value: t.tour.groupUpTo(tour.groupSize) },
    { icon: 'globe', label: t.tour.languages, value: tour.languages.join(' · ') },
  ]

  return (
    <section className="adhero" aria-labelledby="adhero-title">
      <div className="adhero__media">
        <TourImage tour={tour} lang={lang} className="adhero__img" eager />
      </div>
      <div className="a-container adhero__content">
        <nav aria-label={t.tour.breadcrumb}>
          <ol className="adhero__crumbs">
            <li>
              <Link to={to()}>{t.nav.home}</Link>
            </li>
            <li>
              <Link to={to('/tours')}>{t.nav.tours}</Link>
            </li>
            <li aria-current="page">{name}</li>
          </ol>
        </nav>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <p className="adhero__tags">
            <span className="adhero__cat">{categoryOf(tour.category).label[lang]}</span>
            {tour.oldPrice && (
              <span className="atour__offer adhero__offer">
                {t.card.offer} −{discount}%
              </span>
            )}
          </p>
          <h1 id="adhero-title" className="adhero__title">
            {name}
          </h1>
          <p className="adhero__summary">{tour.summary[lang]}</p>
        </motion.div>

        <div className="adhero__actions">
          <button type="button" className="a-btn a-btn--outline adhero__action" onClick={() => shareTour({ tour, t, lang, showToast })}>
            <AgenciaIcon name="share" />
            {t.tour.share}
          </button>
          <button
            type="button"
            className={`a-btn a-btn--outline adhero__action ${fav ? 'is-on' : ''}`}
            aria-pressed={fav}
            onClick={() => toggleFavorite(tour.id)}
            aria-label={fav ? t.card.removeFav(name) : t.card.addFav(name)}
          >
            <AgenciaIcon name="heart" filled={fav} />
            {t.nav.favorites}
          </button>
        </div>
      </div>

      <div className="a-container">
        <dl className="adhero__facts" aria-label={t.tour.facts}>
          {facts.map((f) => (
            <div key={f.label} className="adhero__fact">
              {f.icon && <AgenciaIcon name={f.icon} />}
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
