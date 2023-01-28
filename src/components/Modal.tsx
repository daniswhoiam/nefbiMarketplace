import React, { useState, useEffect } from "react"

interface ModalProps {
  title: string
  show: boolean
  setModalShown: Function
}

const Modal: React.FC<ModalProps> = ({ title, show, setModalShown }) => {
  const [isOpen, setIsOpen] = useState(false)

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
      <div className="modal-container mx-52 origin-top-right transform rounded-lg bg-white px-4 py-6 shadow-xl">
        <div className="modal-header flex items-center justify-between pb-3 gap-4">
          <p className="mb-0 text-2xl font-bold">{title}</p>
          <button
            className="hover:text-gray-500 text-3xl leading-none"
            onClick={() => closeModal()}
          >
            &times;
          </button>
        </div>
        <div className="modal-body px-6 py-4">
          <p>Modal body goes here</p>
        </div>
        <div className="modal-footer flex justify-end pt-2">
          <button
            className="text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2 rounded-lg bg-transparent p-3 px-4"
            onClick={() => closeModal()}
          >
            Close
          </button>
          <button className="bg-indigo-500 hover:bg-indigo-600 rounded-lg p-3 px-4 text-white">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
