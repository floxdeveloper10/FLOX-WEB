import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Home from './pages/Home.jsx'
import { HOME_SECTIONS } from './data/site.js'

// Las demás páginas se descargan solo cuando alguien entra (el inicio carga más rápido)
const Nosotros = lazy(() => import('./pages/Nosotros.jsx'))
const Proyectos = lazy(() => import('./pages/Proyectos.jsx'))
const Apps = lazy(() => import('./pages/Apps.jsx'))
const Proyecto = lazy(() => import('./pages/Proyecto.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* #/precios, #/contacto…: el inicio, bajando a esa sección */}
        {HOME_SECTIONS.map((id) => (
          <Route key={id} path={id} element={<Home />} />
        ))}
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="proyectos" element={<Proyectos />} />
        <Route path="apps" element={<Apps />} />
        {/* /proyectos/agencia/tours…: los sitios demo con varias páginas manejan sus propias rutas */}
        <Route path="proyectos/:slug/*" element={<Proyecto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
