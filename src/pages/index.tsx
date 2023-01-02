import React from "react"
import AllResources from "../components/AllResources"

const Index = (props: any) => {
  return (
    <main className="container mx-auto max-w-screen-xl lg:px-48 md:px-32 px-8">
      <AllResources props={props} /> 
    </main>
  )
}

export default Index

import fsPromises, { readdir } from "fs/promises"
import path from "path"
export async function getStaticProps() {
  const resources = []
  const dirPath = path.join(process.cwd(), "src/data")
  try {
    const files = await readdir(dirPath)
    for (const file of files) {
      const filePath = path.join(dirPath, "/", file)
      try {
        const jsonData = await fsPromises.readFile(filePath)
        const objectData = JSON.parse(jsonData.toString())
        resources.push(objectData)
      } catch (err) {
        console.log(err)
      }
    }
  } catch (err) {
    console.log(err)
  }
  return {
    props: {
      resources
    }
  }
}

