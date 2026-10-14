import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Chakana from '../components/brand/Chakana.jsx'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { nosotros } from '../data/nosotros.js'
import { whatsappLink } from '../data/site.js'
import './Nosotros.css'

const VALUE_ACCENTS = ['fucsia', 'naranja', 'turquesa', 'amarillo']

// La chakana se enciende cuando llega a la pantalla (no al cargar la página)
function BrandChakana() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  return (
    <div ref={ref} className="brand__chakana">
      <div className="brand__glow" aria-hidden="true" />
      {inView ? (
        <Chakana animated title="Chakana tecnológica de FLOX" />
      ) : (
        <Chakana className="brand__chakana-wait" title="Chakana tecnológica de FLOX" />
      )}
    </div>
  )
}

export default function Nosotros() {
  useDocumentTitle('Nosotros')
  const { hero, story, missionVision, values, brand, founder, closing } = nosotros

  return (
    <>
      <PageHero titleId="nosotros-titulo" eyebrow={hero.eyebrow} title={hero.title} />

      {/* Historia + misión y visión */}
      <section className="section section--crema about-story" aria-labelledby="historia-titulo">
        <div className="container">
          <div className="about-story__grid">
            <SectionHeading id="historia-titulo" eyebrow={story.eyebrow} title={story.title} align="left" />
            <Reveal className="about-story__text" delay={0.1}>
              {story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>

          <ul className="about-mv">
            {missionVision.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.1} className={`card about-mv__card accent--${item.accent}`}>
                <h3 className="about-mv__title">{item.title}</h3>
                <p className="about-mv__text">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Valores */}
      <section className="section section--blanco about-values" aria-labelledby="valores-titulo">
        <div className="container">
          <SectionHeading id="valores-titulo" eyebrow={values.eyebrow} title={values.title} />
          <ul className="about-values__list">
            {values.items.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className={`about-values__item accent--${VALUE_ACCENTS[i]}`}>
                <span className="about-values__icon">
                  <Icon name={v.icon} />
                </span>
                <h3 className="about-values__title">{v.title}</h3>
                <p className="about-values__text">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Significado de la marca */}
      <section className="section section--morado brand" aria-labelledby="marca-titulo">
        <div className="container brand__grid">
          <BrandChakana />
          <div>
            <SectionHeading id="marca-titulo" eyebrow={brand.eyebrow} title={brand.title} align="left" tone="dark" />
            <Reveal as="p" className="brand__text">
              {brand.text}
            </Reveal>
            <Reveal as="h3" className="brand__colors-title">
              {brand.colorsTitle}
            </Reveal>
            <ul className="brand__colors">
              {brand.colors.map((c, i) => (
                <Reveal as="li" key={c.hex} delay={i * 0.05} className="brand__color">
                  <span className="brand__swatch" style={{ background: c.hex }} aria-hidden="true" />
                  <span>
                    <span className="brand__color-name">
                      {c.name} <span className="brand__hex">{c.hex}</span>
                    </span>
                    <span className="brand__color-text">{c.text}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fundador */}
      <section className="section section--crema founder" aria-labelledby="fundador-titulo">
        <div className="container">
          <Reveal className="card founder__card">
            <div className="founder__photo">
              {founder.photo ? (
                <img src={`${import.meta.env.BASE_URL}${founder.photo}`} alt={founder.name} loading="lazy" />
              ) : (
                <span className="founder__placeholder">{founder.photoPlaceholder}</span>
              )}
            </div>
            <div className="founder__info">
              <p className="founder__eyebrow">{founder.eyebrow}</p>
              <h2 id="fundador-titulo" className="founder__name">
                {founder.name}
              </h2>
              <p className="founder__role">{founder.role}</p>
              <p className="founder__bio">{founder.bio}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cierre */}
      <section className="section section--blanco about-close" aria-labelledby="cierre-titulo">
        <Reveal className="container about-close__inner">
          <h2 id="cierre-titulo" className="about-close__title">
            {closing.title}
          </h2>
          <p className="about-close__text">{closing.text}</p>
          <a className="btn btn--primary" href={whatsappLink(closing.message)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {closing.button}
          </a>
        </Reveal>
      </section>
    </>
  )
}
