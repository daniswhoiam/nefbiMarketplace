import React from "react"
import { Link } from "gatsby"
import { TiSocialTwitterCircular } from "@react-icons/all-files/ti/TiSocialTwitterCircular"
import { TiSocialFacebookCircular } from "@react-icons/all-files/ti/TiSocialFacebookCircular"
import { TiSocialLinkedinCircular } from "@react-icons/all-files/ti/TiSocialLinkedinCircular"
import Logo from "../assets/images/logo_white_without_bg.svg"
import Hexagon from "../assets/images/hexagon.svg"

const Footer = () => {
  return (
    <footer className="relative w-full text-white bg-grey-black pt-16 pb-10 px-4 lg:px-24 font-open-sans text-sm font-medium overflow-hidden">
      <div className="grid grid-cols-1 gap-y-14">
        <div className="flex flex-col col-span-1 gap-y-2 justify-items-start ">
          <Link to="/" className="h-24 w-48 mr-2">
            <Logo
              name="Nefbi"
              height="inherit"
              width="inherit"
              viewBox="100 0 200 220"
            />
          </Link>
          <p className="mt-2">
            Innere Kanalstraße 218
            <br />
            50670 Köln
          </p>
          <p>info@nefbi.de</p>
        </div>
        <Hexagon
          height="69.82"
          width="79.54"
          fill="#DADADA"
          className="absolute top-[33.82%] left-[64.93%] rotate-[135deg] opacity-[0.15]"
        />
        <div className="col-span-1 grid grid-cols-2 gap-y-6 font-semibold text-base">
          <Link to="/">Startseite</Link>
          <Link to="/ueber-uns">Über Uns</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </div>
        <div className="col-span-1 flex flex-col gap-y-4 font-normal">
          <p>nefbi 2022</p>
          <p>Alle Rechte vorbehalten</p>
          <Link to="/impressum">Impressum</Link>
        </div>
      </div>
      <Hexagon
        height="230.25"
        width="262.32"
        fill="#DADADA"
        className="absolute top-[75.67%] left-[53.61%] rotate-[87.54deg] opacity-[0.15]"
      />
    </footer>
  )
}

export default Footer
