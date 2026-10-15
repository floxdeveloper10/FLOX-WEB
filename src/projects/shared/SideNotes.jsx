import './DemoParts.css'

/**
 * Notas laterales de las demos de apps: explican cada función.
 * La de la pantalla actual se resalta; al tocar una nota, la app va a esa pantalla.
 * Colores y fuente con variables: --demo-accent, --demo-text, --demo-muted, --demo-card, --demo-line, --demo-display.
 */
export default function SideNotes({ notes, current, onSelect, className = '' }) {
  return (
    <ul className={`snotes ${className}`.trim()}>
      {notes.map((note) => {
        const active = note.screen === current
        return (
          <li key={note.screen}>
            <button
              type="button"
              className={`snote ${active ? 'is-active' : ''}`}
              aria-current={active ? 'step' : undefined}
              onClick={() => onSelect(note.screen)}
            >
              <span className="snote__title">
                {note.title}
                <svg viewBox="0 0 24 24" className="snote__arrow" aria-hidden="true" focusable="false">
                  <path d="m9.5 6 6 6-6 6" />
                </svg>
              </span>
              <span className="snote__text">{note.text}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
