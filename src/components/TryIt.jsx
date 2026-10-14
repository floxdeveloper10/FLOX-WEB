import Reveal from './Reveal.jsx'
import SectionHeading from './SectionHeading.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import StepBand from './brand/StepBand.jsx'
import MenuDemo from './demo/MenuDemo.jsx'
import ChatDemo from './demo/ChatDemo.jsx'
import QrCode from './demo/QrCode.jsx'
import { demo, whatsappLink } from '../data/site.js'
import './TryIt.css'

function DemoCta({ text, message }) {
  return (
    <a className="btn btn--primary try__cta" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
      <WhatsAppIcon />
      {text}
    </a>
  )
}

// "Pruébalo tú mismo": demo de la carta digital y demo del chatbot de WhatsApp.
export default function TryIt() {
  const headingId = `${demo.id}-titulo`

  return (
    <section id={demo.id} className="section section--morado try" aria-labelledby={headingId}>
      {/* Franja andina: las pirámides se apoyan en el morado de la sección */}
      <div className="try__band">
        <StepBand />
      </div>

      <div className="container">
        <SectionHeading id={headingId} title={demo.title} lead={demo.lead} tone="dark" />

        <div className="try__grid">
          <Reveal className="try__col">
            <h3 className="try__label">{demo.menu.label}</h3>
            <MenuDemo label={demo.menu.label} />
            <div className="try__qr">
              <QrCode className="try__qr-code" />
              <p>{demo.menu.qrCaption}</p>
            </div>
            <DemoCta text={demo.menu.cta} message={demo.menu.message} />
          </Reveal>

          <Reveal className="try__col" delay={0.12}>
            <h3 className="try__label">{demo.chat.label}</h3>
            <ChatDemo chat={demo.chat} label={demo.chat.label} />
            <DemoCta text={demo.chat.cta} message={demo.chat.message} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
