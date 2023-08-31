import React from 'react';
import HexagonBottomCloud from '../assets/images/hexagon_bottom_cloud.svg';
import Relevanz from '../assets/images/relevanz.svg';
import KeineDiskriminierung from '../assets/images/diskriminierung.svg';
import MarkerOrange from '../assets/images/marker_orange.svg';

const Qualitaetskriterien = () => {
  return (
    <>
      <h1 className="mb-16 break-all px-4 md:px-0 md:text-center lg:mb-32">
        Qualitätskriterien
      </h1>
      <div className="bg-[#B6EAE6] px-4 py-8 md:px-24 2xl:flex 2xl:flex-col 2xl:items-center">
        <h2 className="m-0 2xl:w-full 2xl:max-w-[1568px]">Generell</h2>
        <div className="flex flex-col gap-8 py-8 sm:px-48 md:flex-row md:justify-around md:px-0">
          <div className="flex flex-col items-center md:w-[38%]">
            <Relevanz className="w-24 lg:w-48" />
            <div className="flex flex-col items-center">
              <h3>Relevanz</h3>
              <p className="text-center">
                Die Inhalte werden sorgfältig recherchiert und orientieren sich
                an aktuellen Fachdebatten und wissenschaftlichen Erkenntnissen
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:w-[33%]">
            <KeineDiskriminierung className="w-24 lg:w-48" />
            <div className="flex flex-col items-center">
              <h3>Keine Diskriminierung</h3>
              <p className="text-center">
                Konform sind alle Inhalte, die Diskriminierung und Hetze
                ausschließen.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 px-4 pb-64 md:px-24 lg:mt-32 2xl:flex 2xl:flex-col 2xl:items-center">
        <h2 className="lg:mb-12 2xl:w-full 2xl:max-w-[1568px]">Nach Format</h2>
        <div className="flex flex-col gap-8 sm:pl-12 md:grid md:grid-cols-2 md:pl-0 lg:gap-16 xl:grid-cols-3 2xl:w-full 2xl:max-w-[1568px]">
          <FormatQualitaet
            key="Fachtexte"
            title="Fachtexte"
            bullets={[
              'Literatur- und Quellenangaben',
              'Aktualität (Forschungsstand)',
              'Expert:in Frühe Bildung (Theorie und Praxis)',
              'Veröffentlichung auf einschlägiger Homepage',
              'Freier Zugang',
            ]}
          />
          <FormatQualitaet
            key="Podcasts & Videos"
            title="Podcasts & Videos"
            bullets={[
              'Freier Zugang (ohne Kontoeinrichtung auf Spotify o.Ä.)',
              'Link auf Seite der Herausgeber:innen',
              'Gute Aufnahmequalität',
              'Expert:in Frühe Bildung (Theorie & Praxis)',
            ]}
          />
          <FormatQualitaet
            key="Praxisimpulse"
            title="Praxisimpulse"
            bullets={[
              'Freier Zugang',
              'Expert:in Frühe Bildung (Theorie & Praxis)',
              'Veröffentlichung auf einschlägiger Homepage',
            ]}
          />
          <FormatQualitaet
            key="Online-Kurse"
            title="Online-Kurse"
            bullets={[
              'Kostenlos (Anmeldung möglich)',
              'Definition von Lernzielen',
              'Ausgewiesene Rahmenbedingungen (Zielgruppe, Umfang, ggf. TN-Bescheinigung)',
              'Expert:in Frühe Bildung (Theorie & Praxis)',
            ]}
          />
          <FormatQualitaet
            key="Aus der Praxis"
            title="Aus der Praxis"
            bullets={[
              'Datenschutzkonform (keine Personen identifizierbar außer Autor:in)',
              'Eigene Erstellung, eigene Haftung',
              'Ansprechperson wird genannt',
            ]}
          />
        </div>
      </div>
      <HexagonBottomCloud className="absolute inset-x-0 bottom-0 aspect-[15/8] fill-light-sea-green xl:-bottom-80" />
    </>
  );
};

const FormatQualitaet = ({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) => {
  return (
    <div className="relative">
      <MarkerOrange className="absolute -left-4 top-5 z-0 w-40" />
      <h3 className="relative z-10 py-4">{title}</h3>
      <ul className="list-disc px-8 leading-8">
        {bullets.map(val => {
          return <li key={`${val}`}>{val}</li>;
        })}
      </ul>
    </div>
  );
};

export default Qualitaetskriterien;
