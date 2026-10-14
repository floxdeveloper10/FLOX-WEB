// localStorage / sessionStorage envueltos en try/catch: en modo privado o con el
// almacenamiento bloqueado pueden fallar, y la web debe seguir funcionando igual.

function read(storage, key, fallback) {
  try {
    const raw = window[storage].getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(storage, key, value) {
  try {
    window[storage].setItem(key, JSON.stringify(value))
  } catch {
    // Sin almacenamiento: se mantiene solo en memoria mientras dure la visita
  }
}

export const local = {
  get: (key, fallback) => read('localStorage', key, fallback),
  set: (key, value) => write('localStorage', key, value),
}

export const session = {
  get: (key, fallback) => read('sessionStorage', key, fallback),
  set: (key, value) => write('sessionStorage', key, value),
}
