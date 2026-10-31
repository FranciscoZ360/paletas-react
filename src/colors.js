export const PALETTE_SIZE = 5

// Devuelve un color aleatorio en formato #RRGGBB
export function randomHex(random = Math.random) {
  const value = Math.floor(random() * 0x1000000)
  return `#${value.toString(16).padStart(6, '0').toUpperCase()}`
}

export function isHex(value) {
  return /^#[0-9A-F]{6}$/i.test(value)
}

// Elige texto negro o blanco según la luminosidad del fondo (fórmula WCAG)
export function textColorFor(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.179 ? '#000000' : '#FFFFFF'
}

// Genera una paleta nueva respetando los colores bloqueados
export function generatePalette(current, locked, random = Math.random) {
  return Array.from({ length: PALETTE_SIZE }, (_, i) =>
    locked[i] && current[i] ? current[i] : randomHex(random),
  )
}

// Valida lo que viene de localStorage para no romper la app con datos corruptos
export function parseSaved(raw) {
  try {
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) return []
    return data.filter(
      (p) => Array.isArray(p) && p.length === PALETTE_SIZE && p.every(isHex),
    )
  } catch {
    return []
  }
}
