import { describe, expect, it } from 'vitest'
import { generatePalette, isHex, parseSaved, PALETTE_SIZE, randomHex, textColorFor } from './colors.js'

describe('randomHex', () => {
  it('devuelve un color #RRGGBB válido', () => {
    for (let i = 0; i < 50; i++) expect(isHex(randomHex())).toBe(true)
  })
  it('rellena con ceros a la izquierda', () => {
    expect(randomHex(() => 0)).toBe('#000000')
  })
})

describe('textColorFor', () => {
  it('usa texto blanco sobre fondos oscuros y negro sobre claros', () => {
    expect(textColorFor('#000000')).toBe('#FFFFFF')
    expect(textColorFor('#FFFFFF')).toBe('#000000')
  })
})

describe('generatePalette', () => {
  const current = ['#111111', '#222222', '#333333', '#444444', '#555555']
  it('mantiene los colores bloqueados', () => {
    const next = generatePalette(current, [true, false, true, false, false])
    expect(next).toHaveLength(PALETTE_SIZE)
    expect(next[0]).toBe('#111111')
    expect(next[2]).toBe('#333333')
  })
  it('cambia los no bloqueados', () => {
    const next = generatePalette(current, [false, false, false, false, false], () => 0.5)
    expect(next.every((c) => c === '#800000')).toBe(true)
  })
})

describe('parseSaved', () => {
  it('ignora JSON inválido y datos con forma incorrecta', () => {
    expect(parseSaved('no es json')).toEqual([])
    expect(parseSaved('{"a":1}')).toEqual([])
    expect(parseSaved('[["#12345G","#000000","#000000","#000000","#000000"]]')).toEqual([])
  })
  it('conserva paletas válidas', () => {
    const ok = ['#000000', '#111111', '#222222', '#333333', '#444444']
    expect(parseSaved(JSON.stringify([ok]))).toEqual([ok])
  })
})
