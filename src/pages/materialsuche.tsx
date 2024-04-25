import React from 'react';
import AllResources from '../components/AllResources';
import SideHexagons from '../assets/images/side_hexagons.svg';

const Materialsuche = (props: any) => {
  return (
    <div className="main-container mt-8">
      <AllResources />
      <SideHexagons
        height="700"
        width="480"
        fill="#39B5AC"
        className="z-1 absolute -top-4 left-0 opacity-[4%]"
      />
    </div>
  );
};

export default Materialsuche;
