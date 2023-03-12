import React from "react"
import WavingMascot from "../assets/images/waving_mascot.svg"
import HexagonCloud from "../assets/images/hexagon_bottom_cloud.svg"

const Index = (props: any) => {
  return (
    <div className="hero w-full bg-[#E1F4F3] pt-28 pb-4 before:absolute before:top-0 before:left-0 before:-z-10 before:h-[100%] before:w-screen before:max-w-[100%] before:bg-[#E1F4F3] before:content-['']">
      <div className="hero-text container mx-auto max-w-screen-xl px-8 lg:px-0">
        <h1 className="text-light-sea-green-light">Willkommen!</h1>
        <h2>Was ist Nefbi?</h2>
        <p className="pr-[70%]">
          nefbi steht für Netzwerk Frühe Bildung. Hier findest du vielfältige
          Materialien zu relevanten pädagogischen Themen. Egal ob du duch auf
          eine Facharbeit vorbereitest, den nächsten Praxisimpuls planst oder
          einen Text zum Thema Kinderrechte in der Kita suchst. Mit unserer
          innovativen Suchfunktion wirst du hier schnell fündig. Leg los und
          lass dich inspirieren!
        </p>
      </div>
      <WavingMascot
        height="500"
        width="600"
        viewBox="0 0 700 500"
        className="absolute right-[16rem] bottom-0 z-10 opacity-100"
      />
      <HexagonCloud height="800" width="1800" className="z-5 absolute left-[42%] -bottom-[27%] fill-light-sea-green-dark" />
    </div>
  )
}

export default Index
