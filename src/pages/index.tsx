import React from 'react';

import WavingMascot from '../assets/images/waving_mascot.svg';
import HexagonCloud from '../assets/images/hexagon_bottom_cloud.svg';
import StepOne from '../assets/images/step1.svg';
import StepTwo from '../assets/images/step2.svg';
import StepThree from '../assets/images/step3.svg';
import HexagonBanner from '../assets/images/hexagon_banner.svg';

const Index = (props: any) => {
  return (
    <div className="lg:pb-16">
      <div className="relative flex flex-col items-center overflow-hidden bg-[#E1F4F3] py-24 lg:block lg:px-12 lg:py-0 lg:pb-4 lg:pt-28 xl:px-[8rem] xl:pt-32 2xl:px-[21rem]">
        <HexagonCloud
          viewBox="-200 0 1900 800"
          className="absolute -top-4 left-0 -ml-24 w-[140%] rotate-180 md:hidden"
        />
        <h1 className="text-center text-light-sea-green-light lg:text-left xl:mb-20">
          Willkommen!
        </h1>
        <WavingMascot
          viewBox="0 0 700 700"
          className="z-10 w-48 md:w-64 lg:absolute lg:-bottom-48 lg:-right-24 lg:w-[36rem] xl:right-4 2xl:right-36 2xl:w-[42rem]"
        />
        <div className="mx-4 text-center lg:mx-0 lg:text-left">
          <h2 className="lg:px-0 lg:text-4xl xl:mb-8">Was ist Nefbi?</h2>
          <p className="md:px-24 lg:px-0 lg:pr-[40rem] xl:pr-[44rem] xl:text-base xl:font-semibold 2xl:pr-[48rem]">
            nefbi steht für Netzwerk Frühe Bildung. Hier findest du vielfältige
            Materialien zu relevanten pädagogischen Themen. Egal ob du dich auf
            eine Facharbeit vorbereitest, den nächsten Praxisimpuls planst oder
            einen Text zum Thema Kinderrechte in der Kita suchst. Mit unserer
            innovativen Suchfunktion wirst du hier schnell fündig. <br></br>Leg
            los und lass dich inspirieren!
          </p>
        </div>
        <HexagonCloud
          viewBox="-200 0 1900 800"
          className="absolute bottom-0 left-0 -ml-24 w-[140%] lg:-bottom-36  lg:left-[32rem] lg:ml-0 lg:w-[120%] 2xl:-bottom-40 2xl:left-[48rem] 2xl:w-[100%]"
        />
      </div>
      <div className="mx-4 my-12 text-center lg:mx-0 lg:px-12 lg:text-left xl:px-[8rem] 2xl:px-[21rem]">
        <h2 className="lg:px-0 lg:text-4xl xl:mb-8">Wie nefbi funktioniert</h2>
        <p className="md:px-24 lg:px-0 lg:pr-[40rem] xl:text-base xl:font-semibold 2xl:pr-[48rem]">
          nefbi ermöglicht das Suchen und Finden von Materialien. Im Suchfeld
          kannst du Schlagworte eingeben. Zusätzlich ermöglicht die
          Filterfunktion, Ergebnisse besser einzugrenzen. <br></br> Wie die
          Filterfunktion funktioniert, erklären wir in drei Schritten:
        </p>
      </div>
      <div className="grid grid-cols-1 text-center lg:grid-cols-2 lg:gap-x-10 lg:text-left xl:gap-x-16">
        <StepOne
          viewBox="0 0 400 350"
          className="mx-auto w-96 p-8 lg:order-1 lg:mx-0 lg:justify-self-end"
        />
        <div className="p-8 lg:order-2 lg:my-auto lg:justify-self-start lg:p-0 lg:pr-80 2xl:pr-[36rem]">
          <h3>Auswahl des Arbeitsbereiches</h3>
          <p className="md:px-24 lg:px-0 xl:text-base">
            Wähle deinen Arbeitsbereich aus: Kindertagesstätte,
            Kindertagespflege oder Hort/Ganztagsgrundschule.
          </p>
        </div>
        <StepTwo
          viewBox="0 0 420 350"
          className="mx-auto w-96 p-8 lg:order-4 lg:mx-0 lg:justify-self-start"
        />
        <div className="p-8 lg:order-3 lg:my-auto lg:justify-self-end lg:p-0 lg:pl-80 2xl:pl-[36rem]">
          <h3>Auswahl des gewünschten Formates</h3>
          <p className="md:px-24 lg:px-0 xl:text-base">
            Treffe eine Auswahl für das gewünschte Format: Online-Kurs,
            Fachtext, Podcast, Video, Praxisimpuls und Aus der Praxis
          </p>
        </div>
        <StepThree
          viewBox="0 0 380 350"
          className="mx-auto w-96 p-8 lg:order-5 lg:mx-0 lg:justify-self-end"
        />
        <div className="p-8 lg:order-6 lg:my-auto lg:justify-self-start lg:p-0 lg:pr-80 2xl:pr-[36rem]">
          <h3>Themenauswahl</h3>
          <p className="md:px-24 lg:px-0 xl:text-base">
            Wähle eine Vielzahl von Themen aus unseren drei Kategorien aus:
            Fokusthemen, Pädagogische Grundlagen und Mensch, Organisation und
            Management.
          </p>
        </div>
      </div>
      <div className="grid h-96 xl:mt-36">
        <HexagonBanner
          viewBox="0 0 1500 600"
          className="col-start-1 row-start-1 w-fit self-center"
        />
        <div className="col-start-1 row-start-1 flex flex-col items-center justify-center">
          <h2 className="text-center">
            Jetzt <br></br> loslegen!
          </h2>
          <button className="btn btn-primary px-16 font-semibold text-white">
            nefbi Suche
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
