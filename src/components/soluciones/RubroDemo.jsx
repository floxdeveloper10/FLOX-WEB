import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import SectionHeading from '../SectionHeading.jsx'
import Icon from '../Icon.jsx'
import MenuDemo from '../demo/MenuDemo.jsx'
import ChatDemo from '../demo/ChatDemo.jsx'
import LiveAppPhone from '../apps/LiveAppPhone.jsx'
import ProjectPreview from '../projects/ProjectPreview.jsx'
import { chatScripts } from '../../data/chatScripts.js'
import { projects } from '../../data/proyectos.js'
import { solucionesUi as ui } from '../../data/rubros.js'
import '../TryIt.css'

const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))

function OpenDemo({ slug, label = ui.openDemo }) {
  return (
    <Link className="btn btn--primary rubro-demo__open" to={`/proyectos/${slug}`}>
      {label}
      <Icon name="flecha" />
    </Link>
  )
}

// Una web demo (hotel, agencia): vista previa y enlace al sitio completo
function SiteCard({ slug }) {
  const project = projectBySlug[slug]
  return (
    <Link to={`/proyectos/${slug}`} className="rubro-site project-link">
      <ProjectPreview project={project} size="lg" overlay={ui.openDemo} />
      <span className="rubro-site__body">
        <span className="rubro-site__label">Proyecto demo · negocio ficticio</span>
        <span className="rubro-site__name">{project.name}</span>
        <span className="rubro-site__desc">{project.description}</span>
        <span className="rubro-site__go">
          {ui.openDemo}
          <Icon name="flecha" />
        </span>
      </span>
    </Link>
  )
}

// La demo que corresponde al rubro, incrustada o enlazada
export default function RubroDemo({ rubro }) {
  const { demo } = rubro
  let content

  if (demo.kind === 'restaurante') {
    content = (
      <div className="try__grid">
        <Reveal className="try__col">
          <h3 className="try__label">Carta digital con QR</h3>
          <MenuDemo label="Carta digital con QR (demo)" />
        </Reveal>
        <Reveal className="try__col" delay={0.12}>
          <h3 className="try__label">App de pedidos Qhapaq Pedidos</h3>
          <LiveAppPhone app="app-restaurante" />
          <OpenDemo slug="app-restaurante" label="Ver la app con el panel de cocina" />
        </Reveal>
      </div>
    )
  } else if (demo.kind === 'site') {
    content = (
      <Reveal className="rubro-demo__site">
        <SiteCard slug={demo.slug} />
      </Reveal>
    )
  } else if (demo.kind === 'app') {
    content = (
      <Reveal className="rubro-demo__single">
        <LiveAppPhone app={demo.slug} />
        <OpenDemo slug={demo.slug} />
      </Reveal>
    )
  } else {
    const chat = chatScripts[demo.script]
    content = (
      <Reveal className="rubro-demo__single">
        <ChatDemo chat={chat} label={chat.label} />
      </Reveal>
    )
  }

  return (
    <section className="section section--morado try rubro-demo" aria-labelledby="rubro-demo">
      <div className="container">
        <SectionHeading id="rubro-demo" eyebrow={ui.demoEyebrow} title={demo.title} lead={demo.lead} tone="dark" />
        {content}
      </div>
    </section>
  )
}
