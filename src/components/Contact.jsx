import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import SocialIcon from './SocialIcon.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { contact, site, socialLinks } from '../data/site.js'
import './Contact.css'

export default function Contact() {
  const headingId = `${contact.id}-titulo`

  return (
    <section id={contact.id} className="section section--morado contact" data-origen="contacto" aria-labelledby={headingId}>
      <div className="container contact__inner">
        <Reveal as="header" className="contact__head">
          <h2 id={headingId} className="contact__title">
            {contact.title}
          </h2>
          <p className="contact__lead">{contact.lead}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <a className="contact__whatsapp" href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="contact__whatsapp-icon" />
            <span className="contact__whatsapp-text">
              <span className="contact__whatsapp-label">{contact.cta}</span>
              <span className="contact__whatsapp-number">{site.whatsapp.display}</span>
            </span>
          </a>
        </Reveal>

        <Reveal as="ul" delay={0.2} className="contact__details">
          <li>
            <Icon name="mail" />
            <span className="visually-hidden">{contact.emailLabel}: </span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <Icon name="pin" />
            <span className="visually-hidden">{contact.cityLabel}: </span>
            {site.city}
          </li>
          {socialLinks.length > 0 && (
            <li className="contact__socials">
              <span className="visually-hidden">{contact.socialLabel}: </span>
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social"
                  aria-label={`${s.label} de ${site.name}`}
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </li>
          )}
        </Reveal>
      </div>
    </section>
  )
}
