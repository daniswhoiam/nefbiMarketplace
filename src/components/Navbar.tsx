import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FiAlignJustify } from "@react-icons/all-files/fi/FiAlignJustify"
import { FiX } from "@react-icons/all-files/fi/FiX"
import Logo from "../assets/images/logo_white_reduced.svg"

// https://tailwindcomponents.com/component/responsive-navbar-with-grid-dropdown
const Navbar = () => {
  const [show, setShow] = useState(false)
  return (
    <nav className="fixed z-10 w-full text-white bg-light-sea-green">
      <div className="flex flex-col max-w-screen-xl px-4 py-1 mx-auto md:items-center md:justify-between md:flex-row">
        <div className="flex flex-row items-center justify-between">
          <Link to="/" className="w-40 h-16">
            <Logo/>
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
          <NavLink slug="/" linkText="Startseite" setShow={setShow} />
          <NavLink slug="/marktplatz" linkText="Marktplatz" setShow={setShow} />
          <NavLink slug="/ueber-uns" linkText="Über Uns" setShow={setShow} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

const NavLinkPropTypes = {
  slug: PropTypes.string,
  linkText: PropTypes.string,
  setShow: PropTypes.func,
}

function NavLink({
  slug,
  linkText,
  setShow,
}: {
  slug: string
  linkText: string
  setShow: Function
}) {
  return (
    <Link
      to={slug}
      className="px-4 py-2 mt-2 text-sm bg-transparent rounded-lg lg:text-base font-open-sans md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
      onClick={() => setShow(false)}
    >
      {linkText}
    </Link>
  )
}

NavLink.propTypes = NavLinkPropTypes
