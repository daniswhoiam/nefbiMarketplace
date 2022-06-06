import React, { useState } from "react"
import { Link } from "gatsby"
import { FiAlignJustify } from "@react-icons/all-files/fi/FiAlignJustify"
import { FiX } from "@react-icons/all-files/fi/FiX"
import Logo from "../assets/images/logo_white_without_bg.svg"

// https://tailwindcomponents.com/component/responsive-navbar-with-grid-dropdown
const Navbar = () => {
  const [show, setShow] = useState(false)
  return (
    <nav className="w-full text-white bg-light-sea-green fixed z-10">
      <div className="flex flex-col max-w-screen-xl py-1 px-4 lg:px-24 mx-auto md:items-center md:justify-between md:flex-row">
        <div className="flex flex-row items-center justify-between">
          <Link to="/" className="h-16 w-40 self-center mr-2">
            <Logo
              name="Nefbi"
              className="self-center"
              height="inherit"
              width="inherit"
              viewBox="100 0 250 220"
            />
          </Link>
          <button
            className={`rounded-lg mr-2 p-4 bg-light-sea-green-dark md:hidden focus:outline-none focus:shadow-outline`}
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
            className="px-4 py-2 mt-2 text-sm lg:text-base font-open-sans bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={() => setShow(false)}
          >
            Startseite
          </Link>
          <Link
            to="/ueber-uns"
            className="px-4 py-2 mt-2 text-sm lg:text-base font-open-sans bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
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
