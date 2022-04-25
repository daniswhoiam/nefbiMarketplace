import React from "react"
import PropTypes, { InferProps } from "prop-types"
import Navbar from "./Navbar"
import Footer from "./Footer"

const LayoutPropTypes = {
  children: PropTypes.node
}

// https://blog.logrocket.com/comparing-typescript-and-proptypes-in-react-applications/
type LayoutTypes = InferProps<typeof LayoutPropTypes>;
const Layout = ({ children }: LayoutTypes) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = LayoutPropTypes;

export default Layout
