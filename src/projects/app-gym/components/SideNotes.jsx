import GymIcon from './GymIcon.jsx'

/**
 * Notas que explican cada función. La de la pantalla actual se resalta;
 * al tocar una nota, la app va a esa pantalla.
 */
export default function SideNotes({ notes, current, onSelect, className = '' }) {
  return (
    <ul className={`gnotes ${className}`.trim()}>
      {notes.map((note) => {
        const active = note.screen === current
        return (
          <li key={note.screen}>
            <button
              type="button"
              className={`gnote ${active ? 'is-active' : ''}`}
              aria-current={active ? 'step' : undefined}
              onClick={() => onSelect(note.screen)}
            >
              <span className="gnote__title">
                {note.title}
                <GymIcon name="chevron" className="gnote__arrow" />
              </span>
              <span className="gnote__text">{note.text}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
