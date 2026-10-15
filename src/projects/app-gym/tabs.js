// Pestañas de la barra inferior de Puma Fit
export const TABS = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  { id: 'clases', label: 'Clases', icon: 'calendar' },
  { id: 'rutina', label: 'Rutina', icon: 'dumbbell' },
  { id: 'progreso', label: 'Progreso', icon: 'chart' },
  { id: 'perfil', label: 'Perfil', icon: 'user' },
]

export const tabId = (prefix, id) => `${prefix}-tab-${id}`
