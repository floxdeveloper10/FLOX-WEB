import TourIllustration from './TourIllustrations.jsx'
import TripScene from './TripScenes.jsx'

// Fotos reales en src/projects/agencia/fotos/ (se buscan por nombre, sin importar la extensión)
const files = import.meta.glob('../fotos/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
const stem = (path) => path.split('/').pop().replace(/\.[^.]+$/, '')
const PHOTOS = Object.fromEntries(Object.entries(files).map(([path, url]) => [stem(path), url]))

/** Imagen de la galería de un tour: foto real si existe; si no, la ilustración. */
export default function GalleryImage({ tour, image, lang, className = '' }) {
  const alt = `${tour.name[lang]} · ${image.alt[lang]}`
  const src = PHOTOS[stem(image.photo)]
  if (src) return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />
  if (image.scene === 'viaje') return <TripScene name={image.name} title={alt} className={className} />
  return <TourIllustration name={tour.illustration} colors={tour.colors} mood={image.mood} title={alt} className={className} />
}
