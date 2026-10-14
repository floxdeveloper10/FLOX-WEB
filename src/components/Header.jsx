import { useEffect, useState } from 'react'
import LogoFlox from './brand/LogoFlox.jsx'
import { site } from '../data/site.js'
import './Header.css'

const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#demo', label: 'Demo' },
  { href: '#precios', label: 'Precios' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  // Sobre la portada morada el encabezado es transparente con logo blanco;
  // al bajar se vuelve crema con el logo a color.
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${solid ? 'header--solid' : ''}`}>
      <div className="container header__inner">
        <a href="#inicio" className="header__brand" aria-label="FLOX, ir al inicio">
          <LogoFlox layout="horizontal" variant={solid ? 'color' : 'white'} title="FLOX" className="header__logo" />
        </a>

        <nav className="header__nav" aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--primary btn--sm header__cta" href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
          Escríbenos
        </a>
      </div>
    </header>
  )
}
