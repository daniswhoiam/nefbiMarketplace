import type { GatsbyConfig } from "gatsby"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nefbi - Netzwerk Frühe Bildung`,
    description:
      "Marktplatz für Inhalte, Informationen und Ressourcen zu Themen aus dem Bereich Frühe Bildung.",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google2: [
            {
              family: "Open Sans",
              axes: "wght@300;400;500;700",
            },
            {
              family: "Mitr",
              axes: "wght@300;400;500;700",
            },
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./src/data`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: "data",
        engine: "flexsearch",
        query: `
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
        `,
        normalizer: ({ data }) =>
          data.allDataJson.edges.map(node => ({
            id: node.id,
            titel: node.titel,
            beschreibung: node.beschreibung,
            url: node.url,
            format: node.format,
            thema: node.thema,
            author: node.author,
          })),
      },
    },
  ],
}

export default config
