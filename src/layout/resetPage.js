// Página nueva: arriba del todo y el foco del teclado al inicio de la página
// (si no, el siguiente Tab seguiría desde donde quedó en la página anterior).
export function resetPage() {
  window.scrollTo({ top: 0, behavior: 'instant' })
  document.getElementById('inicio-pagina')?.focus({ preventScroll: true })
}
