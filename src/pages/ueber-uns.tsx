import React from 'react';

import ContactForm from '../components/ContactForm';

import SideHexagons from '../assets/images/side_hexagons.svg';
import HexagonBottomCloud from '../assets/images/hexagon_bottom_cloud.svg';
import Qualitaet from '../assets/images/qualitaet.svg';
import Zugang from '../assets/images/zugang.svg';
import Bildung from '../assets/images/bildung.svg';
import Innovation from '../assets/images/innovation.svg';

import Person from '../components/Person';

const UeberUns = () => {
  return (
    <div className="mx-4 pb-36 md:mx-12 lg:pb-72">
      <SideHexagons
        viewBox="-240 -10 700 700"
        className="absolute -right-24 -top-4 w-72 md:-top-36 md:w-96 lg:-top-64 lg:w-[36rem]"
        fill="#DADADA"
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
        <h2 className="mb-8 lg:mb-24 lg:text-center">Team</h2>
        <div className="flex flex-col gap-16 px-[10%] md:px-[20%]">
          <Person
            personData={{
              imageSource: '/natascha_ro.png',
              name: 'Natascha Berger',
              role: 'Gründerin',
              description:
                'Natascha ist Erziehungswissenschaftlerin, Dozentin für Organisationspädagogik (Universität Koblenz), zertifizierte Trainerin (Train-the-Trainer), Multiplikatorin für die Reckahner Reflexionen und Geschäftsführerin von Wandelwärts. Sie blickt auf viele Jahre Praxiserfahrung mit und in Kindertageseinrichtungen und Grundschulen zurück, u.a. als Kita-Fachkraft und Mitarbeiterin in diversen Bildungsprojekten. Im Team von nefbi ist sie mit Lücy zusammen für die inhaltliche Konzeptionierung, das  Projektmanagement und die Öffentlichkeitsarbeit zuständig.',
            }}
          />
          <Person
            personData={{
              imageSource: '/luecy_ro.png',
              name: 'Katarina Lücy Fuchs',
              role: 'Gründerin',
              description:
                'Lücy ist Sozialpädagogin, Multiplikatorin für die Reckahner Reflexionen und studiert neben ihrer Tätigkeit als Geschäftsführerin bei Wandelwärts den Master “Pädagogik und Management in der Sozialen Arbeit” an der TH Köln. Sie bringt über 12 Jahre Berufspraxis in multiprofessionellen Teams als Hortleitung, Kitaleitung, OGS-& Stiftungs-Mitarbeiterin und Dozentin/Referentin mit. Im Team von nefbi ist sie mit Natascha zusammen für die inhaltliche Konzeptionierung, das Projektmanagement und die  Öffentlichkeitsarbeit zuständig.',
            }}
          />
          <Person
            personData={{
              imageSource: '/daniil_ro.png',
              name: 'Daniil Belazovschi',
              role: 'Gründer',
              description:
                'Daniil ist Entwickler und studiert im Master Wirtschaftsingenieurwesen mit einem Fokus auf Informatik an der TU Berlin. Durch die Gründung seines ehemaligen Unternehmens kitanauten gelangte er in den frühpädagogischen Bereich. Er blickt nun auf mehrere Jahre Programmierung in verschiedenen Bereichen zurück. Mit seinem Fokus auf die Webentwicklung ist er im Team von nefbi für die gesamte technische Konzeption und Umsetzung zuständig.',
            }}
          />
        </div>
        <img
          src="/nefbi_gruppenbild_sm.png"
          alt="Nefbi Gruppenbild"
          className="mx-auto mt-16 max-w-sm rounded-lg shadow-xl sm:max-w-md lg:max-w-3xl"
        />
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
