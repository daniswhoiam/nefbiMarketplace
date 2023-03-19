import React from "react"

import SideHexagons from "../assets/images/side_hexagons.svg"
import HexagonBottomCloud from "../assets/images/hexagon_bottom_cloud.svg"
import Qualitaet from "../assets/images/qualitaet.svg"
import Zugang from "../assets/images/zugang.svg"
import Bildung from "../assets/images/bildung.svg"
import Innovation from "../assets/images/innovation.svg"

const UeberUns = () => {
  return (
    <div className="mx-4 pb-36">
      <SideHexagons
        viewBox="-240 -10 700 700"
        className="absolute -top-4 -right-24 w-72"
      />
      <h1 className="mt-24">Über uns</h1>
      <div className="mt-36">
        <h2 className="text-xl">nefbi - Netzwerk Frühe Bildung</h2>
        <p>
          nefbi ist ein digitaler Raum für alle, die in der Frühen Bildung
          arbeiten: Für pädagogische Fachkräfte in Ausbildung, für
          Kindertagespflegepersonen, für Mitarbeitende in
          Kindertageseinrichtungen, Ganztagsgrundschulen und im Hort. nefbi ist
          ein Raum zum Suchen und Finden, zum Informieren und Weiterbilden. Hier
          findest du vielfältige Materialien zu relevanten pädagogischen Themen.{" "}
          <br />
          Zukünftig bietet nefbi neben der Suchfunktion auch die Möglichkeit für
          Austausch und Vernetzung.
        </p>
      </div>
      <div className="mt-24">
        <h2 className="text-xl">Was uns wichtig ist</h2>
        <div className="grid grid-cols-1 gap-y-16">
          <div className="flex flex-col items-center text-center">
            <Qualitaet viewBox="0 0 150 130" className="mb-4 w-56" />
            <p className="font-semibold">Qualität</p>
            <p className="px-12">
              Unsere Materialien entsprechen eigens entwickelten Kriterien
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zugang viewBox="0 0 150 150" className="mb-4 w-56" />
            <p className="font-semibold">Zugang</p>
            <p className="px-12">
              Die Materialien sind leicht zu finden und direkt nutzbar
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Bildung viewBox="0 0 160 150" className="mb-4 w-56" />
            <p className="font-semibold">Bildung</p>
            <p className="px-12">
              Unsere Materialen regen zur Weiterentwicklung der beruflichen
              Rolle an
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Innovation viewBox="0 0 150 170" className="mb-4 w-56" />
            <p className="font-semibold">Innovation</p>
            <p className="px-12">
              nefbi wird stetig weiterentwickelt und um neue Funktionen ergänzt
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <h2 className="mb-16">Team</h2>
        <div className="grid grid-cols-1 gap-y-12">
          <div className="flex flex-col items-center">
            <img
              src="/daniil_rs.jpeg"
              alt="Bild von Daniil Belazovschi"
              className="mb-4 w-48"
            />
            <p>Daniil Belazovschi</p>
            <p className="text-jet-dark-grey">Gründer</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/natascha_rs.jpg"
              alt="Bild von Natascha Berger"
              className="mb-4 w-48"
            />
            <p>Natascha Berger</p>
            <p className="text-jet-dark-grey">Gründerin</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/luecy_rs.jpg"
              alt="Bild von Katarina Lücy Fuchs"
              className="mb-4 w-48"
            />
            <p>Katarina Lücy Fuchs</p>
            <p className="text-jet-dark-grey">Gründerin</p>
          </div>
        </div>
      </div>
      <HexagonBottomCloud viewBox="-150 -20 1700 800" className="absolute bottom-0 -left-[20vw] w-[140vw]" />
    </div>
  )
}

export default UeberUns
