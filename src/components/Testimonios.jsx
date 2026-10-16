import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import { testimonios } from '../data/testimonios.js'
import { rubrosMenu } from '../data/rubrosMenu.js'
import './Testimonios.css'

const rubroName = Object.fromEntries(rubrosMenu.map((r) => [r.slug, r.name]))

const initials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

// Testimonios de clientes (src/data/testimonios.js). Si no hay ninguno, no se muestra nada.
// rubro: solo los de ese rubro (en su página de soluciones) · tone: color de fondo de la sección
export default function Testimonios({ rubro, tone = 'blanco' }) {
  const list = rubro ? testimonios.filter((t) => t.rubro === rubro) : testimonios
  if (list.length === 0) return null
  const headingId = `testimonios${rubro ? `-${rubro}` : ''}-titulo`

  return (
    <section className={`section section--${tone} testi`} aria-labelledby={headingId}>
      <div className="container">
        <SectionHeading id={headingId} eyebrow="Testimonios" title="Lo que dicen nuestros clientes" />

        <ul className="testi__list">
          {list.map((t, i) => (
            <Reveal as="li" key={`${t.nombre}-${t.negocio}`} delay={i * 0.08}>
              <figure className="card testi__card">
                <blockquote className="testi__text">
                  <p>{t.texto}</p>
                </blockquote>
                <figcaption className="testi__who">
                  {t.foto ? (
                    <img className="testi__photo" src={`${import.meta.env.BASE_URL}${t.foto}`} alt="" loading="lazy" width="52" height="52" />
                  ) : (
                    <span className="testi__photo testi__photo--initials" aria-hidden="true">
                      {initials(t.nombre)}
                    </span>
                  )}
                  <span className="testi__info">
                    <span className="testi__name">{t.nombre}</span>
                    <span className="testi__business">
                      {t.negocio}
                      {!rubro && rubroName[t.rubro] && ` · ${rubroName[t.rubro]}`}
                    </span>
                    {t.maps && (
                      <a className="testi__maps" href={t.maps} target="_blank" rel="noopener noreferrer">
                        <Icon name="mapa" />
                        Ver en Google Maps
                        <span className="visually-hidden"> ({t.negocio})</span>
                      </a>
                    )}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
