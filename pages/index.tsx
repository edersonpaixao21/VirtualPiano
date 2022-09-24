import Head from "next/head"
import { useState } from "react"
import cx from "classnames"
import Player from "../components/Player"
import Toggle from "../components/Toggle"
import styles from "../styles/Home.module.scss"
import { calcChord, Chords } from "../lib/chords"
import { notes, SharpToFlat } from "../lib/notes"
import { calcScale, Scales } from "../lib/scales"


export default function Home() {
  const [key, setKey] = useState("C")
  const [mode, setMode] = useState<"scale" | "chord">("scale")
  const [scale, setScale] = useState(Scales.MAJOR)
  const [chord, setChord] = useState(Chords.MAJOR)
  const [showInstructions, setShowInstructions] = useState(false)
  return (
    <div className={styles.container}>
      <Head>
        <title>Virtual Piano</title>
      </Head>
      <main className={styles.main}>
        <button
          className={styles["instructions-button"]}
          tabIndex={1}
          onClick={() => setShowInstructions(!showInstructions)}
          aria-hidden="true"
        >
          {showInstructions ? "Ocultar Instruções" : " Mostrar Instruções"}
        </button>
        <div
          className={cx(styles.instructions, {
            [styles["instructions-expanded"]]: showInstructions
          })}
        >
          <p>
            Escolha escalas ou acordes, selecione o tom e a escala que você deseja e, em seguida, pressione o botão play para ver e ouvir todas as notas!
          </p>
          <p>
            Pressione as teclas do piano para ouvir as notas. Você pode ligar o pedal
            para manter as notas retidas.
          </p>
          <p>
            Pode não funcionar em dispositivos móveis, desculpe!
            <br /> Às vezes as notas ficam presas... atualize a página para limpá-la
            e começar de novo.
          </p>
        </div>
        <Toggle
          legend="Operating mode"
          onChange={(e) => setMode(mode === "scale" ? "chord" : "scale")}
          optionLeft={{
            label: "Balanças",
            tabIndex: 2,
            value: "scale",
            checked: mode === "scale"
          }}
          optionRight={{
            value: "chord",
            tabIndex: 3,
            label: "Acorde",
            checked: mode === "chord"
          }}
        />
        <div className={styles.selectors}>
          <div className={styles["select-wrapper"]}>
            <label htmlFor="key">Chave</label>
            <select
              id="key"
              value={key}
              tabIndex={4}
              onChange={(e) => setKey(e.target.value)}
            >
              {notes.map((n) => (
                <option key={n} value={n}>
                  {n.includes("#") ? `${n}/${SharpToFlat[n]}` : n}
                </option>
              ))}
            </select>
          </div>
          {mode === "scale" && (
            <div className={styles["select-wrapper"]}>
              <label htmlFor="scale">Escala</label>
              <select
                id="scale"
                tabIndex={5}
                value={scale}
                onChange={(e) => setScale(e.target.value)}
              >
                {Object.keys(Scales).map((s) => (
                  <option key={s} value={Scales[s]}>
                    {Scales[s]}
                  </option>
                ))}
              </select>
            </div>
          )}
          {mode === "chord" && (
            <div className={styles["select-wrapper"]}>
              <label htmlFor="chord">Acorde</label>
              <select
                tabIndex={5}
                id="chord"
                value={chord}
                onChange={(e) => setChord(e.target.value)}
              >
                {Object.keys(Chords).map((c) => (
                  <option key={c} value={Chords[c]}>
                    {Chords[c]}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <Player
          mode={mode}
          chord={calcChord(key, chord)}
          scale={calcScale(key, scale)}
        />
      </main>
    </div>
  )
}
