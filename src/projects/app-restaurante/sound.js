// "Ding" corto y suave para los pedidos nuevos, hecho con Web Audio (sin archivos).
// Los navegadores solo permiten sonido después de que la persona toca la página:
// por eso se "desbloquea" con el primer toque. Si algo falla, simplemente no suena.
let ctx = null

export function unlockAudio() {
  try {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      ctx = new AudioCtx()
    }
    if (ctx.state === 'suspended') ctx.resume()
  } catch {
    ctx = null
  }
}

export function ding() {
  try {
    unlockAudio()
    if (!ctx || ctx.state !== 'running') return
    const t = ctx.currentTime
    // Dos notas (mi y si) que se apagan rápido
    ;[
      [659.25, 0],
      [987.77, 0.12],
    ].forEach(([freq, delay]) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, t + delay)
      gain.gain.exponentialRampToValueAtTime(0.12, t + delay + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.45)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t + delay)
      osc.stop(t + delay + 0.5)
    })
  } catch {
    // Sin audio: la demo sigue igual
  }
}
