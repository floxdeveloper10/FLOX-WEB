import RubroIcon from '../soluciones/RubroIcon.jsx'
import { headerUi } from '../../data/site.js'
import { projectHref, projects } from '../../data/proyectos.js'
import { rubrosMenu as rubros } from '../../data/rubrosMenu.js'

// Opciones de cada desplegable del menú (escritorio)
export function dropdownItems(kind) {
  if (kind === 'soluciones') {
    return {
      items: rubros.map((r) => ({
        key: r.slug,
        to: `/soluciones/${r.slug}`,
        name: r.menuName,
        desc: r.menuDesc,
        visual: (
          <span className="dropdown__icon" aria-hidden="true">
            <RubroIcon name={r.icon} />
          </span>
        ),
      })),
      all: { to: '/cotizar', label: headerUi.solutionsAll },
    }
  }
  return {
    items: projects.map((p) => ({
      key: p.slug,
      to: projectHref(p),
      name: p.name,
      desc: p.type,
      visual: (
        <span className="dropdown__swatch" style={{ background: p.colors.primary }} aria-hidden="true">
          <span style={{ background: p.colors.accent }} />
        </span>
      ),
    })),
    all: { to: '/proyectos', label: headerUi.projectsAll },
  }
}
