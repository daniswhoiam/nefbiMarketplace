import React from "react"

import WavingMascot from "../assets/images/waving_mascot.svg"
import HexagonCloud from "../assets/images/hexagon_bottom_cloud.svg"
import StepOne from "../assets/images/step1.svg"
import StepTwo from "../assets/images/step2.svg"
import StepThree from "../assets/images/step3.svg"
import HexagonBanner from "../assets/images/hexagon_banner.svg"

const Index = (props: any) => {
  return (
    <div>
      <div className="relative flex flex-col items-center bg-[#E1F4F3] py-24">
        <HexagonCloud
          viewBox="0 0 1400 800"
          className="absolute -top-4 left-0 w-full rotate-180"
        />
        <h1 className="text-center">Willkommen!</h1>
        <WavingMascot viewBox="0 0 700 700" className="w-48" />
        <div className="mx-4 text-center">
          <h2>Was ist Nefbi?</h2>
          <p>
            nefbi steht für Netzwerk Frühe Bildung. Hier findest du vielfältige
            Materialien zu relevanten pädagogischen Themen. Egal ob du duch auf
            eine Facharbeit vorbereitest, den nächsten Praxisimpuls planst oder
            einen Text zum Thema Kinderrechte in der Kita suchst. Mit unserer
            innovativen Suchfunktion wirst du hier schnell fündig. <br></br>Leg
            los und lass dich inspirieren!
          </p>
        </div>
        <HexagonCloud
          viewBox="0 0 1400 800"
          className="absolute bottom-0 left-0 w-full"
        />
      </div>
      <div className="my-12 mx-4 text-center">
        <h2>Wie nefbi funktioniert</h2>
        <p>
          nefbi ermöglicht das Suchen und Finden von Materialien. Im Suchfeld
          kannst du Schlagworte eingeben. Zusätzlich ermöglicht die
          Filterfunktion, Ergebnisse besser einzugrenzen. <br></br> Wie die
          Filterfunktion funktioniert, erklären wir in drei Schritten:
        </p>
      </div>
      <div className="grid grid-cols-1 text-center">
        <StepOne viewBox="0 0 400 350" className="w-96 p-8" />
        <div className="p-8">
          <h3>Auswahl des Arbeitsbereiches</h3>
          <p>
            Wähle deinen Arbeitsbereich aus: Kindertagesstätte,
            Kindertagespflege oder Hort/Ganztagsgrundschule.
          </p>
        </div>
        <StepTwo viewBox="0 0 420 350" className="w-96 p-8" />
        <div className="p-8">
          <h3>Auswahl des gewünschten Formates</h3>
          <p>
            Treffe eine Auswahl für das gewünschte Format: Online-Kurs,
            Fachtext, Podcast, Video, Praxisimpuls und Aus der Praxis
          </p>
        </div>
        <StepThree viewBox="0 0 380 350" className="w-96 p-8" />
        <div className="p-8">
          <h3>Themenauswahl</h3>
          <p>
            Wähle eine Vielzahl von Themen aus unseren drei Kategorien aus:
            Fokusthemen, Pädagogische Grundlagen und Mensch, Organisation und
            Management.
          </p>
        </div>
      </div>
      <div className="grid h-96">
        <HexagonBanner
          viewBox="0 0 1500 600"
          className="col-start-1 row-start-1 w-fit self-center"
        />
        <div className="col-start-1 row-start-1 flex flex-col items-center justify-center">
          <h2 className="text-center">
            Jetzt <br></br> loslegen!
          </h2>
          <button className="btn btn-primary font-semibold text-white px-16">nefbi Suche</button>
        </div>
      </div>
    </div>
  )
}

export default Index
