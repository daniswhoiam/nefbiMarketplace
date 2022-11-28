import React from "react"
import { AppProps } from "next/app"
import Layout from "../components/Layout"
import "../assets/css/global.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
