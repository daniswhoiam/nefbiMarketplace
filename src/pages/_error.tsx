import React from 'react';

import ConfusedMascot from '../assets/images/confused_mascot.svg';
import HexagonBanner from '../assets/images/hexagon_banner.svg';

const Error = () => {
  return (
    <div>
      <div className="flex-grow-1 grid h-[94vh] flex-col items-center justify-center overflow-visible">
        <div className="col-start-1 row-start-1 mt-28 flex flex-col items-center justify-center text-center">
          <h1 className="mt-20 text-6xl text-atomic-tangerine-dark">
            Unbekannter <br></br>Fehler
          </h1>
          <p className="mb-20 text-xl">
            Wir können die von dir gesuchte Seite leider nicht finden.
          </p>
        </div>
        <HexagonBanner
          viewBox="0 0 1500 600"
          className="col-start-1 row-start-1  w-screen sm:visible"
        />
        <ConfusedMascot
          viewBox="0 0 250 370"
          className="z-10 col-start-1 row-start-2 -m-24 w-56 place-self-center self-end"
        />
      </div>
    </div>
  );
};

export default Error;
