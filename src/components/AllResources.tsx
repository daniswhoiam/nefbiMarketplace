import React from "react"
import TagList from "./TagList"
import ResourcesList from "./ResourcesList"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
  {
    allContentfulOnlineRessource(sort: { order: DESC, fields: createdAt }) {
      nodes {
        beschreibung {
          beschreibung
        }
        id
        thema
        titel
        url
        format
      }
    }
  }
`

const AllResources = () => {
  const data = useStaticQuery(query)
  const resources = data.allContentfulOnlineRessource.nodes;

  return (
    <section>
      <TagList resources={resources} />
      <ResourcesList resources={resources} />
    </section>
  )
}

export default AllResources
