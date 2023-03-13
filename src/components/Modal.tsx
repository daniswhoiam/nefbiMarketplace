import React, { useState, useEffect } from "react"
import { Resource } from "../utils/interfaces"
import { MdLaunch } from "@react-icons/all-files/md/MdLaunch"
import { FaChild } from "@react-icons/all-files/fa/FaChild"
import { FaHashtag } from "@react-icons/all-files/fa/FaHashtag"

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
      className={`modal left-0 top-0 z-50 flex h-screen w-screen items-center justify-center ${
        isOpen ? "fixed" : "hidden"
      }`}
    >
      <div className="modal-overlay absolute h-full w-full bg-grey-black opacity-50"></div>
      <div className="modal-container mx-[20%] flex h-[90%] origin-top-right transform flex-col justify-between rounded-lg bg-white px-10 py-10 shadow-xl">
        <button
          className="hover:text-gray-500 absolute top-6 right-6 text-4xl leading-none"
          onClick={() => closeModal()}
        >
          &times;
        </button>
        <div className="modal-header flex flex-col justify-between gap-4 pb-3">
          <p className="mb-0 text-2xl font-bold">{titel}</p>
          <p className=" text-jet-dark-grey opacity-80 ">
            {author ? "Quelle: " : ""}
            {author}
            {erscheinungsjahr || herausgeber ? "(" : ""}
            {erscheinungsjahr}
            {erscheinungsjahr ? ", " : ""}
            {herausgeber}
            {erscheinungsjahr || herausgeber ? ")" : ""}
          </p>
          <div className="modal-meta flex gap-4">
            {format ? (
              <p className="mb-0 rounded-lg border border-solid border-atomic-tangerine-light bg-white py-2 px-4 font-medium">
                {format[0]}
              </p>
            ) : (
              ""
            )}
            {altersgruppe ? (
              <div className="flex flex-row items-center justify-center">
                <FaChild className="h-[21px]" size="1rem" />
                <p className="mb-0 py-2 pl-2 font-bold">{altersgruppe}</p>
              </div>
            ) : (
              ""
            )}
            {thema ? (
              <div className="flex flex-row items-center justify-center">
                <FaHashtag className="h-[21px]" size="1rem" />
                <p className="mb-0 py-2 pl-2 font-bold"> {thema.join(", ")}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="modal-body grow py-8">
          <p>{beschreibung}</p>
        </div>
        <div className="modal-footer flex justify-end pt-2">
          <button
            className="text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2 rounded-lg bg-transparent p-3 px-4"
            onClick={() => closeModal()}
          >
            Schließen
          </button>
          <a
            className="mb-0 flex items-center justify-center gap-2 rounded-lg bg-atomic-tangerine-light py-2 px-4"
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
