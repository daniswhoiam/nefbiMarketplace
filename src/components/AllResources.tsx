import React, { useMemo, useState, useEffect } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import TagList from "./TagList"
import ResourcesList from "./ResourcesList"
import Pagination from "./Pagination"
import { graphql, useStaticQuery } from "gatsby"
import { MdSearch } from "@react-icons/all-files/md/MdSearch"

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
        altersgruppe
        erscheinungsjahr
        herausgeber
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
    <section className="grid grid-cols-10 gap-4">
      <div className="col-span-3 p-2">
        <label className="relative block">
          <span className="sr-only">Suche</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MdSearch size="20px" color="#686868" />
          </span>
          <input
            className="flex flex-row items-start pl-8 pr-2 py-4 w-full h-11 border border-solid border-[#DADADA] bg-white rounded-lg"
            type="search"
            placeholder="Suche"
            onChange={event => {
              setSearchQuery(event.target.value)
              console.log(results)
            }}
          />
        </label>
      </div>
      <div className="col-span-7 p-2">
        <h4 className="font-sans text-lg h-11 leading-10 font-medium">
          {results.length > 0 ? results.length : resources.length} Ergebnisse
        </h4>
        <ResourcesList currentItems={currentData} />
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={results.length > 0 ? results.length : resources.length}
          pageSize={PageSize}
          siblingCount={2}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </section>
  )
}

export default AllResources
