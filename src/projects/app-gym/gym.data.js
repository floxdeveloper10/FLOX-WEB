// Datos de ejemplo de Puma Fit, gimnasio ficticio de Cusco (demo de FLOX Apps).
// Todo es inventado: socio, clases, rutina y progreso.

export const gym = {
  name: 'Puma Fit',
  tagline: 'Entrena en la altura',
  city: 'Cusco',
  address: 'Av. de la Cultura 1520, Cusco',
}

export const member = {
  name: 'Diego',
  fullName: 'Diego Quispe Huamán',
  email: 'diego.demo@pumafit.pe',
  phone: '+51 984 000 123',
  memberSince: 'marzo de 2025',
  goal: 'Ganar fuerza',
  height: '1,74 m',
  code: 'PF-0427',
}

// Membresía: se calcula desde hoy para que siempre se vea vigente
export const membership = {
  plan: 'Plan Trimestral',
  totalDays: 90,
  daysLeft: 23,
}

// Planes para renovar (terminan en WhatsApp; sin pagos en la demo)
export const plans = [
  { id: 'mensual', name: 'Plan Mensual', price: 120, detail: '30 días · todas las clases' },
  { id: 'trimestral', name: 'Plan Trimestral', price: 320, detail: '90 días · ahorras S/ 40', popular: true },
  { id: 'anual', name: 'Plan Anual', price: 1100, detail: '365 días · 2 meses gratis' },
]

// Tipos de clase: color propio (sobre fondo oscuro) e ícono
export const classTypes = {
  spinning: { name: 'Spinning', minutes: 45, capacity: 20, color: '#B6F24A' },
  funcional: { name: 'Funcional', minutes: 50, capacity: 16, color: '#5CD6FF' },
  yoga: { name: 'Yoga', minutes: 60, capacity: 14, color: '#FFB86B' },
  box: { name: 'Box', minutes: 60, capacity: 12, color: '#FF6B8A' },
}

// Horario base de cada día (los domingos hay menos clases)
const SLOTS = [
  { type: 'spinning', time: '06:30', coach: 'Rocío Mamani' },
  { type: 'funcional', time: '08:00', coach: 'Marco Huallpa' },
  { type: 'yoga', time: '12:30', coach: 'Killa Torres' },
  { type: 'box', time: '18:00', coach: 'Raúl Condori' },
  { type: 'spinning', time: '19:00', coach: 'Rocío Mamani' },
  { type: 'funcional', time: '20:00', coach: 'Marco Huallpa' },
]
const SUNDAY_SLOTS = [0, 2, 4]

// Cupos ocupados "al azar" pero siempre iguales para cada día y clase
function takenFor(dayIndex, slotIndex, capacity) {
  const n = (dayIndex * 7 + slotIndex * 13 + 5) % 11
  if (n === 0 || n === 6) return capacity // llena
  return Math.max(0, capacity - 1 - n)
}

export function isoDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Próximos 7 días con sus clases (id: fecha + hora + tipo)
export function buildSchedule(today = new Date()) {
  return Array.from({ length: 7 }, (_, dayIndex) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayIndex)
    const iso = isoDate(date)
    const slots = date.getDay() === 0 ? SUNDAY_SLOTS.map((i) => [SLOTS[i], i]) : SLOTS.map((s, i) => [s, i])
    const classes = slots.map(([slot, slotIndex]) => {
      const type = classTypes[slot.type]
      // La clase de Spinning de hoy a las 19:00 nunca está llena: es la reservada al empezar
      const taken = dayIndex === 0 && slotIndex === 4 ? 14 : takenFor(dayIndex, slotIndex, type.capacity)
      return {
        id: `${iso}-${slot.time}-${slot.type}`,
        iso,
        dayIndex,
        type: slot.type,
        name: type.name,
        time: slot.time,
        minutes: type.minutes,
        coach: slot.coach,
        capacity: type.capacity,
        taken,
      }
    })
    return { iso, date, dayIndex, classes }
  })
}

// La clase reservada al empezar la demo: Spinning de hoy, 19:00
export function defaultBookingId(today = new Date()) {
  return `${isoDate(today)}-19:00-spinning`
}

// Rutina del día
export const routine = {
  title: 'Piernas y core',
  focus: 'Día 3 de 4 · Fuerza',
  rest: 60,
  exercises: [
    { id: 'sentadilla', name: 'Sentadilla con barra', sets: 4, reps: '10', load: '60 kg', muscle: 'Cuádriceps' },
    { id: 'prensa', name: 'Prensa de piernas', sets: 4, reps: '12', load: '120 kg', muscle: 'Piernas' },
    { id: 'zancadas', name: 'Zancadas caminando', sets: 3, reps: '12 por lado', load: '2 × 12 kg', muscle: 'Glúteos' },
    { id: 'peso-muerto', name: 'Peso muerto rumano', sets: 3, reps: '10', load: '50 kg', muscle: 'Isquiotibiales' },
    { id: 'pantorrilla', name: 'Elevación de talones', sets: 4, reps: '15', load: '40 kg', muscle: 'Pantorrillas' },
    { id: 'plancha', name: 'Plancha', sets: 3, reps: '45 s', load: 'Peso corporal', muscle: 'Core' },
  ],
}

// Peso de las últimas 8 semanas (kg)
export const weightHistory = [78.4, 77.9, 77.5, 77.6, 76.9, 76.4, 76.1, 75.6]

// Días del mes en que entrenó (los que ya pasaron)
export function attendanceDays(today = new Date()) {
  const pattern = [1, 2, 4, 6, 7, 9, 10, 13, 14, 15, 16, 18, 20, 21, 23, 24, 27, 28, 29, 30]
  return pattern.filter((d) => d < today.getDate())
}

export const streak = { days: 5, best: 12 }

// Logros: los "dinámicos" se desbloquean al usar la demo
export const achievements = [
  { id: 'primera-clase', name: 'Primera clase', detail: 'Tu primera clase en Puma Fit', icon: 'star', unlocked: true },
  { id: 'racha-7', name: 'Racha de 7', detail: '7 días seguidos entrenando', icon: 'flame', unlocked: true },
  { id: 'madrugador', name: 'Madrugador', detail: '5 clases antes de las 7 a. m.', icon: 'sun', unlocked: true },
  { id: 'rutina', name: 'Rutina completa', detail: 'Completa todos los ejercicios del día', icon: 'check', dynamic: 'routine' },
  { id: 'reservas', name: 'Agenda llena', detail: 'Ten 3 clases reservadas', icon: 'calendar', dynamic: 'bookings' },
  { id: 'cumbre', name: 'Cumbre', detail: '100 clases asistidas', icon: 'mountain', unlocked: false },
]

// Notas laterales de la demo: explican cada pantalla
export const notes = [
  { screen: 'bienvenida', title: 'Entrada sin complicaciones', text: 'El socio entra con su cuenta. En la demo, un solo botón: sin usuario ni contraseña.' },
  { screen: 'inicio', title: 'Membresía en el bolsillo', text: 'Días restantes, QR para recepción, próxima clase y racha de entrenamiento.' },
  { screen: 'clases', title: 'Reserva de clases', text: 'Elige el día y reserva con un toque. Los cupos se actualizan y, si está lleno, entra a la lista de espera.' },
  { screen: 'rutina', title: 'Rutina del día', text: 'Marca cada ejercicio al terminarlo y usa el temporizador de descanso (vibra en el celular).' },
  { screen: 'progreso', title: 'Progreso que motiva', text: 'Gráfico de peso, asistencias del mes y logros que se desbloquean.' },
  { screen: 'perfil', title: 'Perfil y renovación', text: 'Datos del socio, renovación por WhatsApp y modo claro u oscuro.' },
]

export const pageText = {
  eyebrow: 'Proyecto demo · FLOX Apps',
  title: 'Puma Fit',
  lead: 'App de ejemplo para un gimnasio de Cusco. Tócala como si estuviera en tu celular: reserva una clase, marca tu rutina y usa el temporizador.',
  notesLabel: 'Funciones de la app',
  reset: 'Reiniciar demo',
  resetDone: 'Demo reiniciada',
  ctaTitle: '¿Quieres una app así para tu gimnasio?',
  ctaText: 'La hacemos con tu marca, tus planes y tus clases. Para Android e iPhone.',
  ctaButton: 'Quiero una app así',
  ctaMessage: 'Hola FLOX, vi la demo de Puma Fit y quiero una app así para mi gimnasio',
  moreApps: 'Ver más apps de ejemplo',
}
