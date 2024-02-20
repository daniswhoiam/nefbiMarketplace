import React, {useEffect, useState} from 'react';
import {MdKeyboardArrowRight} from 'react-icons/md';
import {BiCategory} from 'react-icons/bi';
import classNames from 'classnames';
import {Resource} from '../utils/interfaces';
import {calculateAge} from '../utils/helperFunctions';
import Modal from './Modal';
import ExternalLinkButton from './ExternalLinkButton';

// Props: https://stackoverflow.com/questions/59301171/is-not-assignable-to-type-intrinsicattributes-react-js-and-typescript-js
// Design: https://tailwindcomponents.com/component/tailwind-item-card, https://tailwindcomponents.com/component/article-news-card-1
const Card = ({resource}: {resource: Resource}) => {
  const {id, titel, url, format, beschreibung, altersgruppe} = resource;

  const [modalShown, setModalShown] = useState(false);


  return (
    <article
      key={id}
      className="flex max-h-[22rem] flex-col justify-between rounded-lg border border-solid border-light-sea-green border-opacity-30 bg-[#F7F7F7] p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center justify-center">
          <BiCategory className="h-[21px]" size="1.4rem" />
          <p className="mb-0 py-2 pl-2 font-bold">{format}</p>
        </div>
        <ExternalLinkButton url={url} />
      </div>
      {/* Titel */}
      <h3 className="mb-8 mt-6 line-clamp-3 font-sans text-base font-bold normal-case md:text-lg">
        {titel}
      </h3>
      {/* Beschreibung */}
      <p className="line-clamp-4 text-xs md:text-sm">{beschreibung}</p>
      {/* Footer */}
      <div className="mt-2 flex min-h-[37px] items-center justify-between">
        <button
          className="flex items-center underline underline-offset-2"
          onClick={() => {
            setModalShown(true);
          }}
        >
          <MdKeyboardArrowRight className="inline-block" /> Mehr anzeigen
        </button>
        <p
          className={classNames('mb-0', {
            'rounded-lg bg-light-sea-green px-4 py-2 text-white': altersgruppe,
          })}
        >
          {calculateAge(altersgruppe)}
        </p>
      </div>
      {modalShown ? (
        <Modal
          resource={resource}
          show={modalShown}
          setModalShown={setModalShown}
        />
      ) : (
        ''
      )}
    </article>
  );
};

export default Card;
