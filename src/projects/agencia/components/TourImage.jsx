import TourIllustration from './TourIllustrations.jsx'

// Fotos reales que existan en src/projects/agencia/fotos/ (Vite las detecta al compilar).
// Se buscan por nombre sin extensión: "vinicunca.webp" sirve para "vinicunca.jpg".
const files = import.meta.glob('../fotos/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
const stem = (path) => path.split('/').pop().replace(/\.[^.]+$/, '')
const PHOTOS = Object.fromEntries(Object.entries(files).map(([path, url]) => [stem(path), url]))

/** Imagen de un tour: la foto si existe; si no, su ilustración SVG. */
export default function TourImage({ tour, lang, className = '', eager = false }) {
  const alt = tour.name[lang]
  const src = tour.photo ? PHOTOS[stem(tour.photo)] : null
  if (src) return <img src={src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  return <TourIllustration name={tour.illustration} colors={tour.colors} title={alt} className={className} />
}
