import React from 'react';

interface PersonData {
  imageSource: string;
  name: string;
  role: string;
  description: string;
}

const Person = ({personData}: {personData: PersonData}) => {
  const {imageSource, name, role, description} = personData;

  return (
    <div className="mx-auto flex flex-col gap-8 rounded-lg p-8 shadow-lg max-w-md lg:max-w-3xl lg:flex-row lg:gap-16">
      <div className="flex basis-1/3 flex-col items-center justify-between">
        <img
          src={imageSource}
          alt={`Bild von ${name}`}
          className="mb-4 w-48 drop-shadow-md xl:w-64"
        />
        <div className="flex flex-col items-center justify-end">
          <p className="mb-0 font-bold">{name}</p>
          <p className="mb-0 text-jet-dark-grey">{role}</p>
        </div>
      </div>
      <div className="flex basis-2/3 flex-col justify-center">
        <p className="text-center align-middle italic text-gray-800">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Person;
