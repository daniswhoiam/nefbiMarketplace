import React from 'react';
import AllResources from '../components/AllResources';
import SideHexagons from '../assets/images/side_hexagons.svg';

const Materialsuche = (props: any) => {
  return (
    <div className="main-container mt-8">
      <AllResources props={props} />
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

import fsPromises, {readdir} from 'fs/promises';
import path from 'path';
export async function getStaticProps() {
  const resources = [];
  const dirPath = path.join(process.cwd(), 'src/data');
  try {
    const files = await readdir(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, '/', file);
      try {
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData.toString());
        resources.push(objectData);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      resources,
    },
  };
}
