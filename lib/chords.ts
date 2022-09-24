import { calculateNotePattern, generateOctaves, Note } from "./notes"

export const Chords = Object.freeze({
  MAJOR: "Maior",
  MAJ6: "Maior 6°",
  MAJ7: "Maior 7°",
  DOM7: "Dominante 7°",
  AUG: "Aumentada",
  AUG7: "Aumentada 7°",
  MINOR: "Menor",
  MIN6: "Menor 6°",
  MIN7: "Menor 7°",
  DIM: "Diminuída",
  DIM7: "Diminuída 7°",
  SUS4: "Suspensa 4° (sus4)",
  SUS2: "Suspensa 2° (sus2)",
  ADD9: "Add9",
  MINMAJ: "Menor-maior sétima",
  HALF: "Meio diminuído 7°"
})

export const ChordPatterns = Object.freeze({
  [Chords.MAJOR]: [0, 4, 3],
  [Chords.MAJ6]: [0, 4, 3, 2],
  [Chords.MAJ7]: [0, 4, 3, 4],
  [Chords.DOM7]: [0, 4, 3, 3],
  [Chords.AUG]: [0, 4, 4],
  [Chords.AUG7]: [0, 4, 4, 2],
  [Chords.MINOR]: [0, 3, 4],
  [Chords.MIN6]: [0, 3, 4, 2],
  [Chords.MIN7]: [0, 3, 4, 3],
  [Chords.DIM]: [0, 3, 3],
  [Chords.DIM7]: [0, 3, 3, 3],
  [Chords.MINMAJ]: [0, 3, 4, 4],
  [Chords.HALF]: [0, 3, 3, 4],
  [Chords.SUS4]: [0, 5, 2],
  [Chords.SUS2]: [0, 2, 5],
  [Chords.ADD9]: [0, 4, 3, 7]
})

export function calcChord(rootNote: string, type: string): Array<Note> {
  // start on octave 4, we may want to change this later
  const octave = generateOctaves(rootNote, 4, 2)
  const pat = ChordPatterns[type]
  return calculateNotePattern(octave, pat)
}
