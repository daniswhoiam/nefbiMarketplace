import React, { useState, useEffect } from "react"
import { Resource } from "../utils/interfaces"
import { MdLaunch } from "react-icons/md"
import { FaChild } from "react-icons/fa"
import { FaHashtag } from "react-icons/fa"
import { BiCategory } from "react-icons/bi"
import { calculateAge } from "../utils/helperFunctions"

interface ModalProps {
  resource: Resource
  show: boolean
  setModalShown: Function
}

const Modal: React.FC<ModalProps> = ({ resource, show, setModalShown }) => {
  const [isOpen, setIsOpen] = useState(false)
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
  } = resource

  useEffect(() => {
    setIsOpen(show)
  }, [show])

  useEffect(() => {
    const closeModal = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        event.target.className === "modal"
      ) {
        setModalShown(false)
      }
    }
    window.addEventListener("click", closeModal)
    return () => {
      window.removeEventListener("click", closeModal)
    }
  }, [])

  function closeModal() {
    setModalShown(false)
  }

  return (
    <div
      className={`modal left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center ${
        isOpen ? "fixed" : "hidden"
      }`}
    >
      <div
        className="modal-overlay absolute h-full w-full bg-grey-black opacity-50"
        onClick={() => closeModal()}
      ></div>
      <div className="modal-container flex h-full origin-top-right transform flex-col justify-between bg-white px-10 py-10 shadow-xl md:mx-[20%] md:h-[90%] md:rounded-lg">
        <button
          className="absolute right-6 top-6 text-4xl leading-none hover:text-gray-500"
          onClick={() => closeModal()}
        >
          &times;
        </button>
        <div className="modal-header flex flex-col justify-between gap-4 pb-3 pt-6">
          {thema ? (
            <p className="mb-0 pr-2 font-bold"> {thema.join(" / ")}</p>
          ) : (
            ""
          )}
          <p className="mb-0 text-3xl font-bold text-light-sea-green-light">
            {titel}
          </p>
          <p className=" text-jet-dark-grey opacity-80 ">
            {author ? "Quelle: " : ""}
            {author}
            {erscheinungsjahr || herausgeber ? " (" : ""}
            {erscheinungsjahr}
            {erscheinungsjahr ? ", " : ""}
            {herausgeber}
            {erscheinungsjahr || herausgeber ? ")" : ""}
          </p>
          <div className="modal-meta flex gap-6">
            {format ? (
              <div className="flex flex-row items-center justify-center">
                <BiCategory className="h-[21px]" size="1.4rem" />
                <p className="mb-0 py-2 pl-2 font-bold">{format[0]}</p>
              </div>
            ) : (
              ""
            )}
            {altersgruppe ? (
              <div className="flex flex-row items-center justify-center">
                <FaChild className="h-[21px]" size="1rem" />
                <p className="mb-0 py-2 pl-2 font-bold">
                  {calculateAge(altersgruppe)}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="modal-body grow py-8">
          <p>{beschreibung}</p>
        </div>
        <div className="modal-footer flex justify-around pt-2 sm:justify-end sm:gap-6">
          <button
            className="rounded-lg bg-transparent p-3 text-atomic-tangerine hover:bg-gray-100 hover:text-atomic-tangerine-dark"
            onClick={() => closeModal()}
          >
            Schließen
          </button>
          <a
            className="mb-0 flex items-center justify-center gap-2 rounded-lg bg-atomic-tangerine-light px-4 py-2"
            href={url}
          >
            <p className="m-0 font-bold">Zur Webseite</p>
            <MdLaunch className="h-[21px]" size="1rem" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Modal
