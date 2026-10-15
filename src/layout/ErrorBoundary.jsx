import { Component } from 'react'

// Si una página no se puede mostrar (por ejemplo, falla la descarga de una demo después de
// publicar una versión nueva), en lugar de dejar la web en blanco se ofrece recargar.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="page-error" role="alert">
        <p className="page-error__title">No pudimos cargar esta página</p>
        <p>Revisa tu conexión e inténtalo de nuevo.</p>
        <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
          Recargar
        </button>
      </div>
    )
  }
}
