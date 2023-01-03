import React from "react"
import { AppProps } from "next/app"
import Layout from "../components/Layout"
import "../assets/css/global.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
          <main className="container mx-auto max-w-screen-xl lg:px-48 md:px-32 px-8">
      <Component {...pageProps} />
    </main>

    </Layout>
  )
}
