import { useState } from 'react'
import GymIcon from '../components/GymIcon.jsx'
import ProgressRing from '../components/ProgressRing.jsx'
import QrCode from '../../../components/demo/QrCode.jsx'
import { member, membership, routine, streak } from '../gym.data.js'
import { useGym } from '../gymState.js'
import { classWhen, longDate, membershipEnd } from '../utils.js'

const WEEK = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

export default function Inicio() {
  const { nextClass, days, done, go, showNotice } = useGym()
  // Racha: los últimos días entrenados terminan hoy
  const [today] = useState(() => new Date())
  const todayIndex = (today.getDay() + 6) % 7
  const trained = (i) => i <= todayIndex && i > todayIndex - streak.days

  return (
    <div className="gscreen__inner">
      <header className="ghead">
        <div>
          <p className="ghead__date">{longDate(today)}</p>
          <h2 className="gscreen__title">Hola, {member.name}</h2>
        </div>
        <button type="button" className="giconbtn" aria-label="Ver notificaciones" onClick={showNotice}>
          <GymIcon name="bell" />
          <span className="giconbtn__dot" aria-hidden="true" />
        </button>
      </header>

      {/* Membresía */}
      <article className="gcard gmember" aria-label="Tu membresía">
        <div className="gmember__info">
          <p className="glabel">Membresía activa</p>
          <p className="gmember__plan">{membership.plan}</p>
          <p className="gmuted">Vence el {membershipEnd(today)}</p>
          <ProgressRing value={membership.daysLeft / membership.totalDays} size={84} stroke={8} className="gmember__ring">
            <strong>{membership.daysLeft}</strong>
            <span>días</span>
          </ProgressRing>
          <p className="g-hidden">
            Te quedan {membership.daysLeft} de {membership.totalDays} días
          </p>
        </div>
        <div className="gmember__qr">
          <QrCode className="gmember__code" color="#0F0F10" />
          <p className="gmember__qr-text">Muéstralo en recepción</p>
          <p className="gmember__id">{member.code}</p>
        </div>
      </article>

      {/* Próxima clase */}
      <article className="gcard gnext">
        <p className="glabel">Tu próxima clase</p>
        {nextClass ? (
          <>
            <p className="gnext__name">
              <span className={`gdot gdot--${nextClass.type}`} aria-hidden="true" />
              {nextClass.name}
            </p>
            <p className="gnext__meta">
              <GymIcon name="clock" />
              {classWhen(nextClass, days)} · {nextClass.minutes} min
            </p>
            <p className="gnext__meta">
              <GymIcon name="user" />
              {nextClass.coach}
            </p>
          </>
        ) : (
          <p className="gmuted">Aún no tienes clases reservadas.</p>
        )}
        <button type="button" className="gbtn gbtn--ghost gbtn--sm" onClick={() => go('clases')}>
          {nextClass ? 'Ver mis clases' : 'Reservar una clase'}
          <GymIcon name="chevron" />
        </button>
      </article>

      {/* Racha y rutina */}
      <div className="ggrid2">
        <article className="gcard gstreak">
          <p className="gstreak__num">
            <GymIcon name="flame" className="gstreak__flame" />
            {streak.days}
          </p>
          <p className="gstreak__text">días seguidos</p>
          <ol className="gstreak__week" aria-label={`Racha de ${streak.days} días. Tu mejor racha: ${streak.best} días`}>
            {WEEK.map((d, i) => (
              <li key={i} className={trained(i) ? 'is-on' : ''} aria-hidden="true">
                {d}
              </li>
            ))}
          </ol>
        </article>
        <button type="button" className="gcard groutine-link" onClick={() => go('rutina')}>
          <p className="glabel">Rutina de hoy</p>
          <p className="groutine-link__title">{routine.title}</p>
          <p className="gmuted">
            {done.length} de {routine.exercises.length} hechos
          </p>
          <span className="groutine-link__go" aria-hidden="true">
            <GymIcon name="chevron" />
          </span>
        </button>
      </div>
    </div>
  )
}
