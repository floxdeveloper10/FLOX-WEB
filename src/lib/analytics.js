// Medición con Google Analytics 4. track() es la ÚNICA forma de enviar eventos en el sitio.
//
// Cómo funciona:
// - El ID va en src/data/site.js (gaId). Con el valor de ejemplo "G-XXXXXXXXXX" no se carga nada
//   y track() no hace nada.
// - Google Analytics se carga SOLO si el visitante acepta las cookies (src/lib/consent.js).
// - La web usa HashRouter (#/ruta): por eso el page_view se envía a mano en cada cambio de ruta,
//   con la ruta real (/flox-web/soluciones/restaurantes) en vez de solo /flox-web/.
// - Los UTM con los que llega la visita (utm_source, utm_campaign…) y el gclid de Google Ads se
//   guardan en sessionStorage y viajan con cada evento.
//
// Eventos que se envían:
// - page_view                     cada cambio de ruta
// - whatsapp_click   { origen }   todos los enlaces a WhatsApp (ver AnalyticsListener.jsx)
// - cotizacion_enviada { rubro, total_estimado, plan_mensual, currency, value }
// - demo_interaccion { demo, accion }  la primera vez que se usa cada demo en la visita
// - email_click / facebook_click
//
// ─── Marcar las conversiones (hacerlo una vez, cuando ya lleguen datos) ─────────────────────
// 1. En GA4: Administrar → Visualización de datos → Eventos. Cuando aparezcan whatsapp_click y
//    cotizacion_enviada (puede tardar hasta 24 h), activa la estrella "Marcar como evento clave"
//    en cada uno. Si aún no aparecen, crea el evento clave escribiendo el nombre exacto en
//    Administrar → Eventos clave → Nuevo evento clave.
// 2. En Google Ads: Herramientas → Vinculaciones de cuentas → Google Analytics (GA4) → Vincular
//    la propiedad. Luego Objetivos → Conversiones → Nueva acción de conversión → Importar →
//    Propiedades de Google Analytics 4 → Web, y elige whatsapp_click y cotizacion_enviada.
// 3. Usa "Principal" para la conversión con la que quieres que Ads optimice (por ejemplo
//    whatsapp_click) y "Secundaria" para la otra. cotizacion_enviada envía value en soles (PEN).
// 4. En la URL final de los anuncios usa la portada (https://floxdeveloper10.github.io/flox-web/)
//    y deja activo el etiquetado automático (gclid): aquí se conserva aunque la web use #.
import { site } from '../data/site.js'
import { session } from '../projects/shared/safeStorage.js'

const GA_ID = site.gaId
const UTM_KEY = 'flox:utm'
const DEMOS_KEY = 'flox:demos-usadas'
const LANDING_KEY = 'flox:llegada-enviada'
const CAMPAIGN_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']

// Solo un ID con forma real; "G-XXXXXXXXXX" es el de ejemplo
export const analyticsConfigured = /^G-[A-Z0-9]{4,}$/.test(GA_ID) && !/^G-X+$/.test(GA_ID)

let enabled = false
let loaded = false
let lastPage = null
let lastSentPage = null

// ─── UTM ────────────────────────────────────────────────────────────────────────
// Llegan antes del # (…/flox-web/?utm_source=google#/) o después (…/#/?utm_source=google)
export function captureUtm() {
  const found = {}
  const hashQuery = window.location.hash.split('?')[1] ?? ''
  for (const query of [window.location.search, hashQuery]) {
    const params = new URLSearchParams(query)
    for (const key of CAMPAIGN_PARAMS) {
      const value = params.get(key)
      if (value) found[key] = value.slice(0, 100)
    }
  }
  // Una visita nueva desde otro anuncio reemplaza la anterior; sin UTM se mantiene lo guardado
  if (Object.keys(found).length) session.set(UTM_KEY, found)
}

const campaign = () => {
  const saved = session.get(UTM_KEY, null)
  return saved && typeof saved === 'object' ? saved : {}
}

// Solo source y campaign viajan con cada evento (el resto va en la URL del page_view de llegada)
function utmParams() {
  const { utm_source: source, utm_campaign: name } = campaign()
  return { ...(source && { utm_source: source }), ...(name && { utm_campaign: name }) }
}

// ─── Carga de Google Analytics ─────────────────────────────────────────────────
function loadGtag() {
  window.dataLayer = window.dataLayer || []
  // gtag necesita recibir el objeto arguments tal cual
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  // send_page_view: false → los page_view se envían a mano (HashRouter)
  window.gtag('config', GA_ID, { send_page_view: false })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
  loaded = true
}

// Al aceptar las cookies
export function enableAnalytics() {
  if (!analyticsConfigured || enabled) return
  window[`ga-disable-${GA_ID}`] = false
  if (!loaded) loadGtag()
  enabled = true
  // La página en la que estaba cuando aceptó
  if (lastPage) sendPageView(lastPage)
}

// Al elegir "Solo necesarias" (también si antes había aceptado)
export function disableAnalytics() {
  enabled = false
  if (!analyticsConfigured) return
  window[`ga-disable-${GA_ID}`] = true
  // Borra las cookies de Google Analytics (_ga, _ga_XXXX) en este dominio y en el principal
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!name.startsWith('_ga')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

// ─── Envío ───────────────────────────────────────────────────────────────────────
// Única puerta de salida de los eventos
export function track(event, data = {}) {
  if (!enabled) {
    if (import.meta.env.DEV) console.debug('[analytics: sin enviar]', event, data)
    return
  }
  window.gtag('event', event, { ...utmParams(), ...data })
}

// Dirección "real" de una ruta del HashRouter: /flox-web/#/soluciones/x → /flox-web/soluciones/x
function pageLocation(path, withCampaign) {
  const url = new URL(`${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`, window.location.origin)
  // La primera página de la visita lleva los UTM y el gclid: así GA4 y Ads atribuyen la campaña
  if (withCampaign) for (const [key, value] of Object.entries(campaign())) url.searchParams.set(key, value)
  return url.href
}

function sendPageView(path) {
  // Nunca dos veces seguidas la misma ruta
  if (path === lastSentPage) return
  lastSentPage = path
  // Solo la primera página de la visita lleva la campaña (aunque recargue)
  const withCampaign = !session.get(LANDING_KEY, false)
  session.set(LANDING_KEY, true)
  track('page_view', {
    page_location: pageLocation(path, withCampaign),
    page_path: `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`,
    page_title: document.title,
  })
}

// Cambio de ruta (AnalyticsListener). Se recuerda aunque aún no haya consentimiento.
export function trackPage(path) {
  lastPage = path
  if (enabled) sendPageView(path)
}

// Primera vez que se usa cada demo en la visita
export function trackDemoOnce(demo, accion) {
  // Sin consentimiento no se marca: si luego acepta, su primer uso sí se mide
  if (!enabled) return track('demo_interaccion', { demo, accion })
  const used = session.get(DEMOS_KEY, [])
  const list = Array.isArray(used) ? used : []
  if (list.includes(demo)) return
  session.set(DEMOS_KEY, [...list, demo])
  track('demo_interaccion', { demo, accion })
}
