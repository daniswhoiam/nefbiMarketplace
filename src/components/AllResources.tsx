import React, { useMemo, useState, useEffect } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import TagList from "./TagList"
import ResourcesList from "./ResourcesList"
import Pagination from "./Pagination"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
  {
    allDataJson {
      nodes {
        titel
        beschreibung
        url
        format
        thema
        author
      }
      pageInfo {
        currentPage
        itemCount
        hasNextPage
        hasPreviousPage
        pageCount
        perPage
      }
    }
    localSearchData {
      index
      store
    }
  }
`

const PageSize = 5

// https://tailwindcomponents.com/component/sidebar-2
const AllResources = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const data = useStaticQuery(query)
  const resources = data.allDataJson.nodes
  const results = useFlexSearch(
    searchQuery,
    data.localSearchData.index,
    data.localSearchData.store
  )

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    let data = results.length > 0 ? results : resources
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, searchQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <section className="flex">
      <TagList resources={resources} />
      <div className="pa2">
        <input
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type="search"
          placeholder="Search People"
          onChange={event => {
            setSearchQuery(event.target.value)
            console.log(results)
          }}
        />
      </div>
      <ResourcesList resources={currentData} itemsPerPage={5} />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={resources.length}
        pageSize={PageSize}
        siblingCount={2}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </section>
  )
}

export default AllResources
