import { calculateNotePattern, generateOctaves, Note } from "./notes"

export const Scales = Object.freeze({
  MAJOR: "Maior",
  NAT_MIN: "Natural menor",
  HAR_MIN: "Harmônica menor",
  MEL_MIN_UP: "Melódica menor (acima)",
  MEL_MIN_DOWN: "Melódica menor (baixa)",
  DORIAN: "Modo dórico",
  PHRYIGAN: "Modo frígio",
  LYDIAN: "Modo Lídio",
  MIXOLYDIAN: "Modo mixolídio",
  LOCRIAN: "Modo lócrio",
  PENT_BLUES: "Blues pentatônicos menores"
})

export const ScalePatterns = Object.freeze({
  [Scales.MAJOR]: [0, 2, 2, 1, 2, 2, 2, 1],
  [Scales.NAT_MIN]: [0, 2, 1, 2, 2, 1, 2, 2],
  [Scales.HAR_MIN]: [0, 2, 1, 2, 2, 1, 3, 1],
  [Scales.MEL_MIN_UP]: [0, 2, 1, 2, 2, 2, 2, 1],
  [Scales.MEL_MIN_DOWN]: [12, -2, -2, -1, -2, -2, -1, -2],
  [Scales.DORIAN]: [0, 2, 1, 2, 2, 2, 1, 2],
  [Scales.PHRYIGAN]: [0, 1, 2, 2, 2, 1, 2, 2],
  [Scales.LYDIAN]: [0, 2, 2, 2, 1, 2, 2, 1],
  [Scales.MIXOLYDIAN]: [0, 2, 2, 1, 2, 2, 1, 2],
  [Scales.LOCRIAN]: [0, 1, 2, 2, 1, 2, 2, 2],
  [Scales.PENT_BLUES]: [0, 3, 2, 2, 3, 2]
})

export function calcScale(rootNote: string, type: string): Array<Note> {
  // start on octave 4, we may want to change this later
  const octave = generateOctaves(rootNote, 4, 1)
  const scalePattern = ScalePatterns[type]
  return calculateNotePattern(octave, scalePattern)
}
