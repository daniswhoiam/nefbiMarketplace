import React from "react"
import AllResources from "../components/AllResources"
import SideHexagons from "../assets/images/side_hexagons.svg"

const Index = (props: any) => {
  return (
    <>
      <AllResources props={props} />
      <SideHexagons
        height="700"
        width="480"
        fill="#39B5AC"
        className="absolute left-0 -top-4 opacity-20"
      />
    </>
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
      resources,
    },
  }
}
