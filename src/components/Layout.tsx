import React from "react"
import PropTypes, { InferProps } from "prop-types"
import Navbar from "./Navbar"
import Footer from "./Footer"

const LayoutPropTypes = {
  children: PropTypes.node,
}

// https://blog.logrocket.com/comparing-typescript-and-proptypes-in-react-applications/
type LayoutTypes = InferProps<typeof LayoutPropTypes>
const Layout = ({ children }: LayoutTypes) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Navbar />
      <div className="p-10">{children}</div>
      <Footer />
    </div>
  )
}

Layout.propTypes = LayoutPropTypes

export default Layout
