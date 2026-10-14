import { useAgencia } from '../agenciaState.js'
import { difficultyOf } from '../utils.js'

// Dificultad con puntitos: ●○○ fácil · ●●○ moderada · ●●● exigente
export default function Difficulty({ id, showLabel = true }) {
  const { t, lang } = useAgencia()
  const d = difficultyOf(id)
  return (
    <span className={`adiff adiff--${d.id}`} title={`${t.card.difficulty}: ${d.label[lang]}`}>
      <span className="adiff__dots" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= d.level ? 'is-on' : ''} />
        ))}
      </span>
      <span className={showLabel ? '' : 'a-visually-hidden'}>{showLabel ? d.label[lang] : `${t.card.difficulty}: ${d.label[lang]}`}</span>
    </span>
  )
}
