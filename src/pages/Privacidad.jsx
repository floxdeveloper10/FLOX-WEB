// REVISAR con un asesor antes de formalizar la empresa (Ley 29733).
// Política de privacidad sencilla: qué datos se recogen, para qué y cómo pedir que se borren.
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { site } from '../data/site.js'
import { seo } from '../data/seo.js'
import { openCookieSettings, useConsent } from '../lib/consent.js'
import './Privacidad.css'

const UPDATED = 'octubre de 2026'

export default function Privacidad() {
  usePageMeta(seo.privacidad)
  const { choice } = useConsent()
  const current = choice === 'all' ? 'Aceptaste las cookies de medición.' : choice === 'necessary' ? 'Elegiste solo las necesarias.' : 'Aún no elegiste.'

  return (
    <>
      <PageHero
        titleId="privacidad-titulo"
        eyebrow="Privacidad"
        title="Política de privacidad"
        lead="En simple: qué datos recogemos, para qué los usamos y cómo pedir que los borremos."
      />

      <section className="section section--crema privacy" aria-labelledby="privacidad-titulo">
        <div className="container privacy__inner">
          <article className="card privacy__card">
            <p className="privacy__updated">Última actualización: {UPDATED}</p>

            <h2>¿Quiénes somos?</h2>
            <p>
              {site.name} es un emprendimiento de tecnología de {site.city}. Si tienes cualquier pregunta sobre tus datos,
              escríbenos a <a href={`mailto:${site.email}`} data-origen="privacidad">{site.email}</a>.
            </p>

            <h2>¿Qué datos recogemos?</h2>
            <ul>
              <li>
                <strong>Visitas anónimas, solo si aceptas las cookies.</strong> Usamos Google Analytics para saber cuántas
                personas visitan la web, qué páginas ven, desde qué tipo de dispositivo y de qué anuncio o red social
                llegaron. No sabemos quién eres: no recogemos tu nombre, tu correo ni tu número.
              </li>
              <li>
                <strong>Lo que tú nos escribes.</strong> Si nos escribes por WhatsApp o nos envías una cotización (que
                también llega por WhatsApp), recibimos lo que pongas en el mensaje: tu nombre, el de tu negocio, tu número y
                lo que necesitas.
              </li>
              <li>
                <strong>Lo que se guarda en tu propio navegador.</strong> Tu elección de cookies, el avance del cotizador y
                lo que haces en las demos se guardan solo en tu dispositivo, para que no lo pierdas al recargar. No nos
                llega a nosotros.
              </li>
            </ul>

            <h2>¿Para qué los usamos?</h2>
            <ul>
              <li>Para responderte y prepararte la propuesta o la cotización que pediste.</li>
              <li>Para saber qué partes de la web funcionan mejor y mejorarla.</li>
              <li>Para medir si nuestros anuncios traen visitas que nos escriben.</li>
            </ul>

            <h2>Lo que nunca hacemos</h2>
            <p>
              <strong>No vendemos ni alquilamos tus datos</strong> a nadie. Tampoco te agregamos a listas de publicidad sin tu
              permiso.
            </p>

            <h2>Cookies</h2>
            <p>
              Las cookies de medición (Google Analytics) solo se activan si tocas &quot;Aceptar&quot; en el aviso. Con
              &quot;Solo necesarias&quot; no se carga nada de Google. Puedes cambiar tu elección cuando quieras.
            </p>
            <div className="privacy__cookies">
              <p>
                <strong>Tu elección:</strong> {current}
              </p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={openCookieSettings}>
                Cambiar mi elección
              </button>
            </div>

            <h2>¿Quieres que borremos tus datos?</h2>
            <p>
              Escríbenos a <a href={`mailto:${site.email}?subject=Borrar%20mis%20datos`} data-origen="privacidad">{site.email}</a>{' '}
              con el asunto &quot;Borrar mis datos&quot; y el número o nombre con el que nos escribiste. Los borramos y te
              confirmamos por el mismo medio. También puedes pedirnos ver o corregir lo que tengamos.
            </p>

            <p className="privacy__back">
              <Link to="/" className="btn btn--primary btn--sm">
                Volver al inicio
              </Link>
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
