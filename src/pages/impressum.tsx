import React from 'react';
import HexagonBottomCloud from '../assets/images/hexagon_bottom_cloud.svg';

const Impressum = () => {
  return (
    <div className='px-[20%] flex flex-col gap-4 mb-20'>
      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>
        Daniil Belazovschi, Natascha Berger und Katarina L&uuml;cy Fuchs - nefbi
        GbR
        <br />
        Innere Kanalstr. 218
        <br />
        50670 K&ouml;ln
      </p>

      <p>
        <strong>Vertreten durch:</strong>
        <br />
        Daniil Belazovschi
        <br />
        Natascha Berger
        <br />
        Katarina L&uuml;cy Fuchs
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: admin@nefbi.de
      </p>

      <h2>
        Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
      </h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <p>
        Quelle: <a href="https://www.e-recht24.de">eRecht24</a>
      </p>
      <HexagonBottomCloud className="absolute inset-x-0 bottom-0 xl:-bottom-80 aspect-[15/8] fill-light-sea-green" />
    </div>
  );
};

export default Impressum;
