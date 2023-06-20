import React from 'react';

import ContactForm from '../components/ContactForm';

import SideHexagons from '../assets/images/side_hexagons.svg';
import HexagonBottomCloud from '../assets/images/hexagon_bottom_cloud.svg';
import Qualitaet from '../assets/images/qualitaet.svg';
import Zugang from '../assets/images/zugang.svg';
import Bildung from '../assets/images/bildung.svg';
import Innovation from '../assets/images/innovation.svg';

const UeberUns = () => {
  return (
    <div className="mx-4 pb-36 md:mx-12 lg:pb-72">
      <SideHexagons
        viewBox="-240 -10 700 700"
        fill="#DADADA"
        className="absolute -right-24 -top-4 w-72 md:-top-36 md:w-96 lg:-top-64 lg:w-[36rem] opacity-20"
      />
      <h1 className="mt-24 lg:text-center">Über uns</h1>
      <div className="mt-36">
        <h2 className="text-xl lg:text-center lg:text-3xl xl:mb-20">
          nefbi - Netzwerk Frühe Bildung
        </h2>
        <p className="md:pr-56 lg:px-[18rem] xl:px-[24rem] 2xl:px-[30rem]">
          nefbi ist ein digitaler Raum für alle, die in der Frühen Bildung
          arbeiten: Für pädagogische Fachkräfte in Ausbildung, für
          Kindertagespflegepersonen, für Mitarbeitende in
          Kindertageseinrichtungen, Ganztagsgrundschulen und im Hort. nefbi ist
          ein Raum zum Suchen und Finden, zum Informieren und Weiterbilden. Hier
          findest du vielfältige Materialien zu relevanten pädagogischen Themen.{' '}
          <br />
          Zukünftig bietet nefbi neben der Suchfunktion auch die Möglichkeit für
          Austausch und Vernetzung.
        </p>
      </div>
      <div className="mt-24">
        <h2 className="text-xl md:mb-16 md:text-3xl lg:mb-32 lg:text-center">
          Was uns wichtig ist
        </h2>
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-16 lg:grid-cols-4 lg:gap-x-0">
          <div className="flex flex-col items-center text-center md:justify-between">
            <Qualitaet
              viewBox="0 0 150 130"
              className="mb-4 w-56 md:max-h-48"
            />
            <p className="font-semibold">Qualität</p>
            <p className="px-12">
              Unsere Materialien entsprechen eigens entwickelten Kriterien
            </p>
          </div>
          <div className="flex flex-col items-center text-center md:justify-between">
            <Zugang viewBox="0 0 150 150" className="mb-4 w-56 md:max-h-48" />
            <p className="font-semibold">Zugang</p>
            <p className="px-12">
              Die Materialien sind leicht zu finden und direkt nutzbar
            </p>
          </div>
          <div className="flex flex-col items-center text-center md:justify-between">
            <Bildung viewBox="0 0 160 150" className="mb-4 w-56 md:max-h-48" />
            <p className="font-semibold">Bildung</p>
            <p className="px-12 md:px-2">
              Unsere Materialen regen zur Weiterentwicklung der beruflichen
              Rolle an
            </p>
          </div>
          <div className="flex flex-col items-center text-center md:justify-between">
            <Innovation
              viewBox="0 0 150 170"
              className="mb-4 w-56 md:max-h-48"
            />
            <p className="font-semibold">Innovation</p>
            <p className="px-12">
              nefbi wird stetig weiterentwickelt und um neue Funktionen ergänzt
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24 lg:mt-36">
        <h2 className="mb-16 lg:mb-48 lg:text-center">Team</h2>
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <img
              src="/daniil_ro.png"
              alt="Bild von Daniil Belazovschi"
              className="mb-4 w-48 xl:w-64"
            />
            <p>Daniil Belazovschi</p>
            <p className="text-jet-dark-grey">Gründer</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/natascha_ro.png"
              alt="Bild von Natascha Berger"
              className="mb-4 w-48 xl:w-64"
            />
            <p>Natascha Berger</p>
            <p className="text-jet-dark-grey">Gründerin</p>
          </div>
          <div className="flex flex-col items-center md:col-span-2 lg:col-span-1">
            <img
              src="/luecy_ro.png"
              alt="Bild von Katarina Lücy Fuchs"
              className="mb-4 w-48 xl:w-64"
            />
            <p>Katarina Lücy Fuchs</p>
            <p className="text-jet-dark-grey">Gründerin</p>
          </div>
        </div>
      </div>
      <h2 className="my-12 lg:my-36 lg:text-center">Schreibe uns</h2>
      <ContactForm />
      <HexagonBottomCloud
        viewBox="-150 -20 1700 800"
        className="absolute -left-[20vw] bottom-0 z-10 w-[140vw] lg:-bottom-12 xl:-left-[10vw] xl:w-[120vw]"
      />
    </div>
  );
};

export default UeberUns;
