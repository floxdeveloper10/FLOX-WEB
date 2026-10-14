import { motion } from 'framer-motion'
import AgenciaIcon from '../components/AgenciaIcon.jsx'
import Avatar from '../components/Avatar.jsx'
import TourIllustration from '../components/TourIllustrations.jsx'
import { useAgencia, useAgenciaTitle } from '../agenciaState.js'
import { certifications, languagesSpoken, team } from '../agencia.data.js'

const reveal = (i) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
})

export default function Nosotros() {
  const { t, lang } = useAgencia()
  useAgenciaTitle(t.pageTitle.about)

  return (
    <>
      <section className="a-section aabout" aria-labelledby="aabout-title">
        <div className="a-container aabout__grid">
          <div>
            <p className="a-eyebrow">{t.about.eyebrow}</p>
            <h1 id="aabout-title" className="a-title">
              {t.about.title}
            </h1>
            {t.about.story.map((p) => (
              <p key={p} className="a-lead">
                {p}
              </p>
            ))}
          </div>
          <div className="aabout__art" aria-hidden="true">
            <TourIllustration name="valle-sagrado" colors={{ sky: '#F2C98A' }} title="" />
          </div>
        </div>
      </section>

      <section className="a-section a-section--white ateam" aria-labelledby="ateam-title">
        <div className="a-container">
          <div className="a-heading a-heading--center">
            <h2 id="ateam-title" className="a-title">
              {t.about.teamTitle}
            </h2>
            <p className="ateam__note">
              <span className="a-sample">{t.about.teamNote}</span>
            </p>
          </div>
          <ul className="ateam__list">
            {team.map((g, i) => (
              <motion.li key={g.name} className="ateam__card" {...reveal(i)}>
                <Avatar avatar={g.avatar} className="ateam__avatar" />
                <h3 className="ateam__name">{g.name}</h3>
                <p className="ateam__role">{g.role[lang]}</p>
                <ul className="ateam__langs" aria-label={t.about.languagesTitle}>
                  {g.languages.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="a-section aextra" aria-label={t.about.certificationsTitle}>
        <div className="a-container aextra__grid">
          <div>
            <h2 className="aextra__title">
              <AgenciaIcon name="globe" />
              {t.about.languagesTitle}
            </h2>
            <ul className="aextra__chips">
              {languagesSpoken.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="aextra__title">
              <AgenciaIcon name="award" />
              {t.about.certificationsTitle}
            </h2>
            <ul className="aextra__list">
              {certifications.map((c) => (
                <li key={c.es}>
                  <AgenciaIcon name="check" />
                  {c[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
