import React from "react"
import WavingMascot from "../assets/images/waving_mascot.svg"
import HexagonCloud from "../assets/images/hexagon_bottom_cloud.svg"
import StepOne from "../assets/images/step1.svg"
import StepTwo from "../assets/images/step2.svg"
import StepThree from "../assets/images/step3.svg"

const Index = (props: any) => {
  return (
    <div className="main-container mx-0">
      <div className="hero relative w-screen overflow-hidden bg-[#E1F4F3] pt-28 pb-4">
        <div className="hero-text container mx-auto max-w-screen-xl px-8 lg:px-0">
          <h1 className="text-light-sea-green-light">Willkommen!</h1>
          <h2>Was ist Nefbi?</h2>
          <p className="pr-[70%]">
            nefbi steht für Netzwerk Frühe Bildung. Hier findest du vielfältige
            Materialien zu relevanten pädagogischen Themen. Egal ob du duch auf
            eine Facharbeit vorbereitest, den nächsten Praxisimpuls planst oder
            einen Text zum Thema Kinderrechte in der Kita suchst. Mit unserer
            innovativen Suchfunktion wirst du hier schnell fündig. <br></br>Leg
            los und lass dich inspirieren!
          </p>
        </div>
        <WavingMascot
          height="500"
          width="600"
          viewBox="0 0 700 500"
          className="absolute right-[16rem] bottom-0 z-10 opacity-100"
        />
        <HexagonCloud
          height="800"
          width="1800"
          className="z-5 absolute left-[42%] -bottom-[27%] fill-light-sea-green-dark"
        />
      </div>
      <div className="relative mt-20 w-screen">
        <div className="container mx-auto max-w-screen-xl">
          <h2 className=" text-4xl">Wie nefbi funktioniert</h2>
          <p className=" pr-[60%] text-lg font-medium">
            nefbi ermöglicht das Suchen und Finden von Materialien. Im Suchfeld
            kannst du Schlagworte eingeben. Zusätzlich ermöglicht die
            Filterfunktion, Ergebnisse besser einzugrenzen. <br></br> Wie die
            Filterfunktion funktioniert, erklären wir in drei Schritten:
          </p>
        </div>
      </div>
      <div className="tutorial relative mt-9 w-screen">
        <div className="steps container mx-auto grid max-w-screen-xl grid-cols-2 gap-16">
          <StepOne className="col-span-1 self-center justify-self-end" />
          <div className="step-one col-span-1 self-center justify-self-start pr-48">
            <h3 className="text-3xl">Auswahl des Arbeitsbereiches</h3>
            <p className="text-lg">
              Wähle deinen Arbeitsbereich aus: Kindertagesstätte,
              Kindertagespflege oder Hort/Ganztagsgrundschule.
            </p>
          </div>
          <div className="step-two col-span-1 self-center justify-self-end pl-48">
            <h3 className="text-3xl">Auswahl des gewünschten Formates</h3>
            <p className="text-lg">
              Treffe eine Auswahl für das gewünschte Format: Online-Kurs,
              Fachtext, Podcast, Video, Praxisimpuls und Aus der Praxis
            </p>
          </div>
          <StepTwo className="col-span-1 self-center justify-self-start" />
          <StepThree className="col-span-1 self-center justify-self-end" />
          <div className="step-three col-span-1 self-center justify-self-start pr-48">
            <h3 className="text-3xl">Themenauswahl</h3>
            <p className="text-lg">
              Wähle eine Vielzahl von Themen aus unseren drei Kategorien aus:
              Fokusthemen, Pädagogische Grundlagen und Mensch, Organisation und
              Management.
            </p>
          </div>
        </div>
      </div>
      <div className="action-banner relative w-screen">
        <div className="container mx-auto flex max-w-screen-xl flex-col">
          <h2>Jetzt loslegen!</h2>
          <button className="btn-primary btn">nefbi Suche</button>
        </div>
      </div>
    </div>
  )
}

export default Index
