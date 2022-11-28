import React from "react"
import Link from "next/link"
import Logo from "../assets/images/logo_white_without_bg.svg"
import Hexagon from "../assets/images/hexagon.svg"

const Footer = () => {
  return (
    <footer className="relative w-full px-4 pt-16 pb-10 overflow-hidden text-sm font-medium text-white bg-grey-black lg:px-24">
      <div className="grid max-w-screen-xl grid-cols-1 mx-auto gap-y-14 lg:grid-cols-3">
        <div className="flex flex-col col-span-1 gap-y-2 justify-items-start">
          <Link href="/" className="mr-2">
            <Logo
              name="Nefbi"
              height="6rem"
              width="12rem"
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
        <div className="grid grid-cols-2 col-span-1 text-base font-semibold gap-y-6 lg:col-span-2 lg:justify-items-start lg:items-center">
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
            className="leading-normal tracking-[.015em] text-lg mb-2"
          >
            Impressum
          </Link>
        </div>
        <Hexagon
          height="69.82"
          width="79.54"
          fill="#DADADA"
          className="absolute top-40 right-24 lg:top-32 lg:right-44 rotate-[135deg] opacity-[0.15]"
        />
        <Hexagon
          height="230.25"
          width="262.32"
          fill="#DADADA"
          className="absolute -bottom-32 -right-12 rotate-[87.54deg] opacity-[0.15]"
        />
      </div>
    </footer>
  )
}

export default Footer
