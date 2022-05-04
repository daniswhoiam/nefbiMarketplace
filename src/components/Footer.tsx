import React from "react"
import { Link } from "gatsby"
import { TiSocialTwitterCircular } from "@react-icons/all-files/ti/TiSocialTwitterCircular"
import { TiSocialFacebookCircular } from "@react-icons/all-files/ti/TiSocialFacebookCircular"
import { TiSocialLinkedinCircular } from "@react-icons/all-files/ti/TiSocialLinkedinCircular"

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-100">
        {/*
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap">
          <div className="p-5 w-48">
            <Link to="/" className="my-3 block">
              Startseite <span className="text-teal-600 text-xs p-1"></span>
            </Link>
            <Link to="/ueber-uns" className="my-3 block">
              Über uns <span className="text-teal-600 text-xs p-1"></span>
            </Link>
          </div>
          <div className="p-5 w-48 ">
            <a className="my-3 block" href="/#">
              XXX XXXX, Floor 4 XXXXX Köln{" "}
              <span className="text-teal-600 text-xs p-1"></span>
            </a>
            <a className="my-3 block" href="/#">
              contact@company.com{" "}
              <span className="text-teal-600 text-xs p-1"></span>
            </a>
          </div>
        </div>*/}
      </div>
      <div className="bg-gray-100 pt-2 ">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      md:flex-row max-w-6xl"
        >
          <div className="mt-2">
            &copy; {new Date().getFullYear()} <span>Nefbi</span>. Alle Rechte vorbehalten.
          </div>
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="/#" className="w-6 mx-1">
              <TiSocialTwitterCircular
                className="fill-current cursor-pointer text-gray-500 hover:text-gray-400"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
              />
            </a>
            <a href="/#" className="w-6 mx-1">
              <TiSocialFacebookCircular
                className="fill-current cursor-pointer text-gray-500 hover:text-gray-400"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
              />
            </a>
            <a href="/#" className="w-6 mx-1">
              <TiSocialLinkedinCircular
                className="fill-current cursor-pointer text-gray-500 hover:text-gray-400"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
