import React from "react"
import Layout from "../components/Layout"
import AllResources from "../components/AllResources"

const Index = () => {
  return (
    <Layout>
      <main className="container mx-auto max-w-screen-xl lg:px-48 md:px-32 px-8">
        <AllResources />
      </main>
    </Layout>
  )
}

export default Index
