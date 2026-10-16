import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site.js'
import { track, trackPage } from './analytics.js'

// Origen cuando un enlace de WhatsApp no tiene data-origen (no debería pasar: en desarrollo avisa)
function originFromPath(pathname) {
  if (pathname === '/' || pathname === '') return 'portada'
  const [first, second] = pathname.split('/').filter(Boolean)
  if (first === 'soluciones' && second) return `rubro-${second}`
  if (first === 'proyectos' && second) return `demo-${second}`
  return first
}

// Montado una vez en Layout:
// - page_view en cada cambio de ruta (con la ruta real, no el #)
// - un solo listener de clics para todos los enlaces de WhatsApp, correo y Facebook del sitio,
//   así no se escapa ninguno. El origen sale del data-origen más cercano al enlace.
export default function AnalyticsListener() {
  const { pathname } = useLocation()

  // Se espera a que la página nueva ponga su título (llega después de la transición)
  useEffect(() => {
    let sent = false
    const send = () => {
      if (sent) return
      sent = true
      trackPage(pathname)
    }
    const timer = setTimeout(send, 700)
    return () => {
      clearTimeout(timer)
      send()
    }
  }, [pathname])

  useEffect(() => {
    const onClick = (event) => {
      // Clic normal o con la rueda (abre en otra pestaña)
      if (event.type === 'auxclick' && event.button !== 1) return
      const link = event.target.closest?.('a[href]')
      if (!link) return
      const href = link.getAttribute('href')
      const tagged = link.closest('[data-origen]')?.dataset.origen
      const origen = tagged ?? originFromPath(window.location.hash.slice(1).split('?')[0])
      if (href.includes('wa.me/')) {
        if (!tagged && import.meta.env.DEV) console.warn('[analytics] enlace de WhatsApp sin data-origen:', link)
        track('whatsapp_click', { origen })
      } else if (href.startsWith('mailto:')) {
        track('email_click', { origen })
      } else if (site.social.facebook && href.startsWith(site.social.facebook)) {
        track('facebook_click', { origen })
      }
    }
    document.addEventListener('click', onClick, true)
    document.addEventListener('auxclick', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('auxclick', onClick, true)
    }
  }, [])

  return null
}
