// Punto al que llega "Saltar al contenido" dentro de un proyecto demo (después de su menú)
export default function SkipTarget() {
  return <span data-skip-target tabIndex={-1} className="skip-target" />
}
