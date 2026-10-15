import { useEffect } from 'react'
import { seo } from '../data/seo.js'

function setMeta(selector, value) {
  const el = document.head.querySelector(selector)
  if (el && value) el.setAttribute('content', value)
}

/**
 * Título de la pestaña y meta descripción de la página (también para compartir: og y twitter).
 * - title: título completo; undefined deja el título como está (la agencia pone el de cada página)
 * - description: si falta, se usa la del inicio
 */
export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    if (title !== undefined) {
      document.title = title
      setMeta('meta[property="og:title"]', title)
      setMeta('meta[name="twitter:title"]', title)
    }
    const desc = description ?? seo.home.description
    setMeta('meta[name="description"]', desc)
    setMeta('meta[property="og:description"]', desc)
    setMeta('meta[name="twitter:description"]', desc)
  }, [title, description])
}
