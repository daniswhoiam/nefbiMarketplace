import React, {useState, useEffect} from 'react';
import ReactModal from 'react-modal';
import {Resource} from '../utils/interfaces';
import {MdLaunch} from 'react-icons/md';
import {FaChild} from 'react-icons/fa';
import {FaHashtag} from 'react-icons/fa';
import {BiCategory} from 'react-icons/bi';
import {calculateAge} from '../utils/helperFunctions';
import ExternalLinkButton from './ExternalLinkButton';

interface ModalProps {
  resource: Resource;
  show: boolean;
  setModalShown: Function;
}

const Modal: React.FC<ModalProps> = ({resource, show, setModalShown}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    titel,
    thema,
    beschreibung,
    url,
    format,
    author,
    altersgruppe,
    erscheinungsjahr,
    herausgeber,
  } = resource;

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  function closeModal() {
    setModalShown(false);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      portalClassName="fixed z-50"
      className={
        'absolute bottom-4 left-4 right-4 top-4 mx-auto flex max-w-4xl flex-col overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-white p-6 outline-none'
      }
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => closeModal()}
      appElement={document.getElementsByTagName('body')[0] as HTMLElement}
    >
      <button
        className="absolute right-6 top-6 text-4xl leading-none hover:text-gray-500"
        onClick={() => closeModal()}
      >
        &times;
      </button>
      <div className="modal-header flex flex-col justify-between gap-4 pb-3 pt-6">
        {thema ? (
          <p className="mb-0 pr-2 font-bold"> {thema.join(' / ')}</p>
        ) : (
          ''
        )}
        <p className="mb-0 text-2xl font-bold text-light-sea-green-light">
          {titel}
        </p>
        <p className=" text-jet-dark-grey opacity-80 ">
          {author ? 'Quelle: ' : ''}
          {author}
          {erscheinungsjahr || herausgeber ? ' (' : ''}
          {erscheinungsjahr}
          {erscheinungsjahr ? ', ' : ''}
          {herausgeber}
          {erscheinungsjahr || herausgeber ? ')' : ''}
        </p>
        <div className="modal-meta flex gap-6">
          {format ? (
            <div className="flex flex-row items-center justify-center">
              <BiCategory className="h-[21px]" size="1.4rem" />
              <p className="mb-0 py-2 pl-2 font-bold">{format[0]}</p>
            </div>
          ) : (
            ''
          )}
          {altersgruppe ? (
            <div className="flex flex-row items-center justify-center">
              <FaChild className="h-[21px]" size="1rem" />
              <p className="mb-0 py-2 pl-2 font-bold">
                {calculateAge(altersgruppe)}
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="modal-body grow overflow-auto py-8">
        <p>{beschreibung}</p>
      </div>
      <div className="modal-footer flex justify-around pt-2 sm:justify-end sm:gap-6">
        <button
          className="rounded-lg bg-transparent p-3 text-atomic-tangerine hover:bg-gray-100 hover:text-atomic-tangerine-dark"
          onClick={() => closeModal()}
        >
          Schließen
        </button>
        <ExternalLinkButton url={url} />
      </div>
    </ReactModal>
  );
};

export default Modal;
