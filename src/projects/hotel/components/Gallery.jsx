import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HotelIcon from './HotelIcon.jsx'
import HotelImage from './HotelImage.jsx'
import Lightbox from './Lightbox.jsx'
import { useHotel } from '../hotelState.js'
import { gallery } from '../hotel.data.js'
import './Gallery.css'

export default function Gallery() {
  const { t, lang } = useHotel()
  const [index, setIndex] = useState(null)
  const triggers = useRef([])

  const close = () => {
    const last = index
    setIndex(null)
    requestAnimationFrame(() => triggers.current[last]?.focus({ preventScroll: true }))
  }

  return (
    <section id="galeria" className="h-section h-section--navy hgal" aria-labelledby="hgal-title">
      <div className="h-container">
        <header className="h-heading">
          <p className="h-eyebrow">{t.gallery.eyebrow}</p>
          <h2 id="hgal-title" className="h-title">
            {t.gallery.title}
          </h2>
        </header>

        <ul className="hgal__grid">
          {gallery.map((image, i) => (
            <li key={image.photo} className={`hgal__item hgal__item--${i}`}>
              <button
                ref={(el) => {
                  triggers.current[i] = el
                }}
                type="button"
                className="hgal__button"
                onClick={() => setIndex(i)}
                aria-label={`${t.gallery.open}: ${image.alt[lang]}`}
              >
                <HotelImage image={image} lang={lang} className="hgal__img" />
                <span className="hgal__caption" aria-hidden="true">
                  {image.alt[lang]}
                  <HotelIcon name="expand" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {index !== null && <Lightbox images={gallery} index={index} onChange={setIndex} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
