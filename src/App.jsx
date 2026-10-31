import { useEffect, useState } from 'react'
import { PALETTE_SIZE, generatePalette, parseSaved, textColorFor } from './colors.js'

const STORAGE_KEY = 'paletas-react:guardadas'
const NO_LOCKS = Array(PALETTE_SIZE).fill(false)

function loadSaved() {
  try {
    return parseSaved(localStorage.getItem(STORAGE_KEY))
  } catch {
    return []
  }
}

export default function App() {
  const [palette, setPalette] = useState(() => generatePalette([], NO_LOCKS))
  const [locked, setLocked] = useState(NO_LOCKS)
  const [saved, setSaved] = useState(loadSaved)
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {
      // sin almacenamiento disponible (modo privado): la app sigue funcionando
    }
  }, [saved])

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(''), 1500)
    return () => clearTimeout(timer)
  }, [message])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault()
        setPalette((p) => generatePalette(p, locked))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [locked])

  const toggleLock = (i) =>
    setLocked((l) => l.map((value, index) => (index === i ? !value : value)))

  async function copy(hex) {
    try {
      await navigator.clipboard.writeText(hex)
      setMessage(`${hex} copiado`)
    } catch {
      setMessage('No se pudo copiar')
    }
  }

  const savePalette = () => {
    const key = palette.join()
    if (saved.some((p) => p.join() === key)) return setMessage('Ya está guardada')
    setSaved((s) => [palette, ...s])
    setMessage('Paleta guardada')
  }

  return (
    <main>
      <h1>Paletas de colores</h1>
      <p className="hint">
        Pulsa la barra espaciadora o el botón para generar. Bloquea los colores que quieras conservar.
      </p>

      <section className="palette" aria-label="Paleta actual">
        {palette.map((hex, i) => (
          <div key={i} className="swatch" style={{ background: hex, color: textColorFor(hex) }}>
            <button className="hex" onClick={() => copy(hex)} title="Copiar código">
              {hex}
            </button>
            <button className="lock" onClick={() => toggleLock(i)} aria-pressed={locked[i]}>
              {locked[i] ? 'Bloqueado' : 'Bloquear'}
            </button>
          </div>
        ))}
      </section>

      <div className="actions">
        <button className="primary" onClick={() => setPalette((p) => generatePalette(p, locked))}>
          Generar paleta
        </button>
        <button onClick={savePalette}>Guardar paleta</button>
      </div>
      <p className="message" role="status">
        {message}
      </p>

      <section>
        <h2>Guardadas ({saved.length})</h2>
        {saved.length === 0 && <p className="hint">Aún no hay paletas guardadas.</p>}
        <ul className="saved">
          {saved.map((p) => (
            <li key={p.join()}>
              <button
                className="mini"
                onClick={() => {
                  setPalette(p)
                  setLocked(NO_LOCKS)
                }}
                aria-label={`Cargar paleta ${p.join(' ')}`}
              >
                {p.map((hex, i) => (
                  <span key={i} style={{ background: hex }} />
                ))}
              </button>
              <button className="remove" onClick={() => setSaved((s) => s.filter((x) => x !== p))}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
