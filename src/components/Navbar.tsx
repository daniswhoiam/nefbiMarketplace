import React, { useState } from "react"
import { Link } from "gatsby"
import { FiAlignJustify } from "@react-icons/all-files/fi/FiAlignJustify"
import { FiX } from "@react-icons/all-files/fi/FiX"
import Logo from "../assets/images/logo.svg"

// https://tailwindcomponents.com/component/responsive-navbar-with-grid-dropdown
const Navbar = () => {
  const [show, setShow] = useState(false)
  return (
    <nav className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <Link to="/" className="h-20 w-40 self-center mr-2">
            <Logo
              name="Nefbi"
              className="self-center"
              height="inherit"
              width="inherit"
              viewBox="600 100 220 460"
            />
          </Link>
          <button
            className={`rounded-lg md:hidden focus:outline-none focus:shadow-outline`}
            onClick={() => setShow(!show)}
          >
            <FiAlignJustify className={`${show ? "hidden" : ""} w-6 h-6`} />
            <FiX className={`${show ? "" : "hidden"} w-6 h-6`} />
          </button>
        </div>
        <div
          className={`${
            show ? "flex" : "hidden"
          } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
        >
          <Link
            to="/"
            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={() => setShow(false)}
          >
            Startseite
          </Link>
          <Link
            to="/ueber-uns"
            className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={() => setShow(false)}
          >
            Über Uns
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
