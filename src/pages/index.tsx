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

      <div className="grid h-96 xl:mt-36">
        <HexagonBanner
          viewBox="0 0 1500 600"
          fill="#FFA065"
          className="col-start-1 row-start-1 self-center"
        />
        <div className="col-start-1 row-start-1 flex flex-col items-center justify-center">
          <h1>Diese Seite befindet sich im Aufbau!</h1>
        </div>
      </div>
    </div>
  );
};

export default Index;
