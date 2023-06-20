import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {FiAlignJustify, FiX} from 'react-icons/fi';
import Logo from '../assets/images/logo_white_reduced.svg';

// https://tailwindcomponents.com/component/responsive-navbar-with-grid-dropdown
const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <nav className="fixed z-50 w-full bg-light-sea-green text-white lg:px-24">
      <div className="mx-auto flex max-w-screen-xl flex-col px-4 py-1 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between">
          <Link href="/" className="w-42 h-14">
            <Logo />
          </Link>
          <button
            className={`focus:shadow-outline mr-2 rounded-lg bg-light-sea-green-dark p-4 focus:outline-none md:hidden`}
            onClick={() => setShow(!show)}
          >
            <FiAlignJustify className={`${show ? 'hidden' : ''} h-6 w-6`} />
            <FiX className={`${show ? '' : 'hidden'} h-6 w-6`} />
          </button>
        </div>
        <div
          className={`${
            show ? 'flex' : 'hidden'
          } flex-grow flex-col pb-4 md:flex md:flex-row md:justify-end md:pb-0`}
        >
          <NavLink slug="/" linkText="Startseite" setShow={setShow} />
          <NavLink slug="/marktplatz" linkText="Marktplatz" setShow={setShow} />
          <NavLink slug="/ueber-uns" linkText="Über Uns" setShow={setShow} />
          <NavLink slug="/qualitaetskriterien" linkText="Qualität" setShow={setShow} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavLinkPropTypes = {
  slug: PropTypes.string,
  linkText: PropTypes.string,
  setShow: PropTypes.func,
};

function NavLink({
  slug,
  linkText,
  setShow,
}: {
  slug: string;
  linkText: string;
  setShow: Function;
}) {
  return (
    <Link
      href={slug}
      className="font-open-sans focus:shadow-outline mt-2 rounded-lg bg-transparent px-4 py-2 text-sm hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none md:ml-4 md:mt-0 lg:text-base"
      onClick={() => setShow(false)}
    >
      {linkText}
    </Link>
  );
}

NavLink.propTypes = NavLinkPropTypes;
