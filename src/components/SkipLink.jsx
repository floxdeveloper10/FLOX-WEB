// "Saltar al contenido": primer elemento de cada página, visible solo al usar el teclado.
// En las páginas de FLOX lleva al contenido principal; en los proyectos demo, salta la barra
// de FLOX y el menú del demo (punto marcado con <SkipTarget />).
// Con HashRouter un href="#…" cambiaría de página, por eso el foco se mueve a mano.
export default function SkipLink() {
  const skip = (event) => {
    event.preventDefault()
    const target = document.querySelector('[data-skip-target]') ?? document.getElementById('contenido')
    if (!target) return
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    target.scrollIntoView({ block: 'start' })
  }

  return (
    <a className="skip-link" href="#contenido" onClick={skip}>
      Saltar al contenido
    </a>
  )
}
