import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import GalleryImage from '../GalleryImage.jsx'
import Lightbox from '../Lightbox.jsx'
import { useAgencia } from '../../agenciaState.js'

// Galería de 4 imágenes del tour que se abren en grande
export default function TourGallery({ tour }) {
  const { t, lang } = useAgencia()
  const [index, setIndex] = useState(null)
  const triggers = useRef([])

  const close = () => {
    const last = index
    setIndex(null)
    requestAnimationFrame(() => triggers.current[last]?.focus({ preventScroll: true }))
  }

  return (
    <section className="adgal" aria-label={t.tour.gallery}>
      <ul className="adgal__grid">
        {tour.gallery.map((image, i) => (
          <li key={image.photo} className={`adgal__item adgal__item--${i}`}>
            <button
              ref={(el) => {
                triggers.current[i] = el
              }}
              type="button"
              className="adgal__button"
              onClick={() => setIndex(i)}
              aria-label={t.tour.openImage(image.alt[lang])}
            >
              <GalleryImage tour={tour} image={image} lang={lang} className="adgal__img" />
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {index !== null && (
          <Lightbox
            count={tour.gallery.length}
            index={index}
            onChange={setIndex}
            onClose={close}
            caption={tour.gallery[index].alt[lang]}
            renderImage={(i) => <GalleryImage tour={tour} image={tour.gallery[i]} lang={lang} className="alight__img" />}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
