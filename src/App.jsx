import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Problems from './components/Problems.jsx'
import Services from './components/Services.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Services />
        {/* Próxima parte: Pruébalo tú mismo (demos) */}
        <HowWeWork />
        {/* Próximas partes: Precios, Por qué FLOX, Contacto */}
      </main>
      <WhatsAppFloat />
    </>
  )
}
