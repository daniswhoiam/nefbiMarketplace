import React from "react"
import TagList from "./TagList"
import ResourcesList from "./ResourcesList"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
  {
    allDataJson {
      edges {
        node {
          titel
          beschreibung
          url
          format
          thema
          author
        }
      }
    }
  }
`
// https://tailwindcomponents.com/component/sidebar-2
const AllResources = () => {
  const data = useStaticQuery(query)
  const resources = data.allDataJson.edges

  return (
    <section className="flex">
      <TagList resources={resources} />
      <ResourcesList resources={resources} />
    </section>
  )
}

export default AllResources
