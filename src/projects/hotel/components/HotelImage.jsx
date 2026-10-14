import Illustration from './Illustrations.jsx'

// Fotos reales que existan en src/projects/hotel/fotos/ (Vite las detecta al compilar).
// Se buscan por nombre sin extensión: "suite-killa.webp" sirve para "suite-killa.jpg".
const files = import.meta.glob('../fotos/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' })
const stem = (path) => path.split('/').pop().replace(/\.[^.]+$/, '')
const PHOTOS = Object.fromEntries(Object.entries(files).map(([path, url]) => [stem(path), url]))

/**
 * Imagen del hotel: usa la foto si existe; si no, la ilustración SVG.
 * `image` viene de hotel.data.js: { photo, illustration, alt: { es, en } }
 */
export default function HotelImage({ image, lang, className = '', eager = false }) {
  const alt = image.alt[lang]
  const src = image.photo ? PHOTOS[stem(image.photo)] : null

  if (src) {
    return <img src={src} alt={alt} className={className} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  }
  return <Illustration name={image.illustration} title={alt} className={className} />
}
