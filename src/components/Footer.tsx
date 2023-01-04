import React from "react"
import Link from "next/link"
import Logo from "../assets/images/logo_white_without_bg.svg"
import Hexagon from "../assets/images/hexagon.svg"

const Footer = () => {
  return (
    <footer className="relative w-full px-4 pt-16 pb-2 overflow-hidden text-sm font-medium text-white bg-grey-black lg:px-24">
      <div className="grid max-w-screen-xl grid-cols-1 mx-auto gap-y-14 lg:grid-cols-3">
        <div className="flex flex-col col-span-1 gap-y-2 justify-items-start">
          <Link href="/" className="mr-2">
            <Logo
              name="Nefbi"
              height="7rem"
              width="15rem"
              viewBox="100 0 200 220"
            />
          </Link>
          <div className="ml-6 mt-2 font-bold">
            <p>Innere Kanalstraße 218</p>
            <p>50670 Köln</p>
            <p>info@nefbi.de</p>
          </div>
        </div>
        <div className="grid grid-cols-2 col-span-1 text-base font-semibold gap-y-6 mr-[18rem] my-[4rem] lg:col-span-2 lg:justify-items-center lg:items-center">
          <Link href="/">Startseite</Link>
          <Link href="/ueber-uns">Über Uns</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
        <div className="flex flex-col col-span-1 font-normal gap-y-4 lg:col-span-3 lg:flex-row lg:justify-center lg:gap-x-16">
          <p>&copy; nefbi 2022</p>
          <p>Alle Rechte vorbehalten</p>
          <Link
            href="/impressum"
            className="tracking-[.015em] text-lg mb-2"
          >
            <p>Impressum</p>
          </Link>
        </div>
        <Hexagon
          height="90.82"
          width="120.54"
          fill="#DADADA"
          className="absolute top-40 right-24 lg:top-36 lg:right-[20rem] rotate-[135deg] opacity-[0.15]"
        />
        <Hexagon
          height="400.25"
          width="420.32"
          fill="#DADADA"
          className="absolute -bottom-56 -right-16 rotate-[87.54deg] opacity-[0.15]"
        />
      </div>
    </footer>
  )
}

export default Footer
