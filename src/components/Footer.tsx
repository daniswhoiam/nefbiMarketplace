import React from 'react';
import Link from 'next/link';
import Logo from '../assets/images/logo_white_without_bg.svg';
import Hexagon from '../assets/images/hexagon.svg';

const Footer = () => {
  return (
    <footer className="z-99 relative z-50 w-full overflow-hidden bg-grey-black px-4 pb-2 pt-16 text-sm font-medium text-white lg:px-24">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-y-14 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col justify-items-start gap-y-2">
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
        <div className="col-span-1 my-[4rem] mr-[8rem] grid grid-cols-2 gap-y-6 text-base font-semibold sm:mr-[18rem] lg:col-span-2 lg:items-center lg:justify-items-center">
          <Link href="/">Startseite</Link>
          <Link href="/marktplatz">Marktplatz</Link>
          <Link href="/ueber-uns">Über Uns</Link>
          <Link href="/qualitaetskriterien">Qualität</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
        <div className="col-span-1 flex flex-col gap-y-4 font-normal lg:col-span-3 lg:flex-row lg:justify-center lg:gap-x-16">
          <p>&copy; nefbi 2022</p>
          <p>Alle Rechte vorbehalten</p>
          <Link href="/impressum" className="mb-2 text-lg tracking-[.015em]">
            <p>Impressum</p>
          </Link>
        </div>
        <Hexagon
          height="90.82"
          width="120.54"
          fill="#DADADA"
          className="absolute right-24 top-40 rotate-[135deg] opacity-[0.15] lg:right-[20rem] lg:top-36"
        />
        <Hexagon
          height="400.25"
          width="420.32"
          fill="#DADADA"
          className="absolute -bottom-56 -right-16 rotate-[87.54deg] opacity-[0.15]"
        />
      </div>
    </footer>
  );
};

export default Footer;
