import React, { useMemo, useState, useEffect } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import TagList from "./TagList"
import Filter from "./Filter"
import ResourcesList from "./ResourcesList"
import Pagination from "./Pagination"
import { graphql, useStaticQuery } from "gatsby"
import { MdSearch } from "@react-icons/all-files/md/MdSearch"
import { Resource } from "../utils/interfaces"

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

const PageSize = 6

interface filterFields {
  altersgruppe: string
  erscheinungsjahr: string
}

// https://tailwindcomponents.com/component/sidebar-2
const AllResources = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState([])
  const data = useStaticQuery(query)
  const resources: Array<Resource> = Object.values(data.localSearchData.store) //data.allDataJson.nodes
  let results = useFlexSearch(
    searchQuery,
    data.localSearchData.index,
    data.localSearchData.store
  )
  const filterTabs = ["Filter", "Themen"]
  const noResults = results && results.length == 0 && searchQuery != ""

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    let data = results.length > 0 ? results : resources
    if (filterData.length > 0) {
      data = filterData
    }
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, searchQuery, filterData])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional
  function setFilter(filterObject: Partial<filterFields>) {
    let filterResults = []
    const baseResults = results && results.length > 0 ? results : resources
    // https://stackoverflow.com/questions/69010671/filter-an-array-of-objects-by-another-object-of-filters
    if (baseResults && baseResults.length > 0) {
      filterResults = baseResults.filter((resource: Resource) => {
        let filterResult = false
        Object.keys(filterObject).every(key => {
          const filterValue = filterObject[key as keyof filterFields]
          if (filterValue === "Alle") {
            filterResult = true
            return
          }
          const resourceValue = resource[key as keyof Resource]
          if (Array.isArray(resourceValue)) {
            // https://linguinecode.com/post/how-to-solve-typescript-possibly-undefined-value
            if (filterValue === "Kein Eintrag") {
              filterResult = resourceValue.length == 0
            } else {
              filterResult = resourceValue.includes(filterValue!)
            }
          } else {
            if (filterValue === "Kein Eintrag") {
              filterResult = resourceValue === ""
            } else {
              filterResult = resourceValue === filterValue
            }
          }
        })
        return filterResult
      })
    }
    setFilterData(filterResults)
  }

  // TO DO: Correct counts and pagination
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
            }}
          />
        </label>
        {/* Tab Buttons */}
        <div className="flex items-center justify-between mt-4">
          {filterTabs.map(tab => {
            return (
              <button className="px-6 py-1 text-white rounded-t-md bg-light-sea-green">
                {tab}
              </button>
            )
          })}
        </div>
        <Filter setFilter={setFilter} />
      </div>
      <div className="col-span-7 p-2">
        <h4 className="font-sans text-lg font-medium leading-10 h-11">
          {currentData?.length > 0 || results?.length > 0
            ? Math.max(currentData?.length, results?.length)
            : resources.length}{" "}
          Ergebnisse
        </h4>
        {noResults ? (
          <div>Es gibt keine Ergebnisse für diese Suche.</div>
        ) : (
          <>
            <ResourcesList currentItems={currentData} />
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={
                results.length > 0 ? results.length : resources.length
              }
              pageSize={PageSize}
              siblingCount={2}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </section>
  )
}

export default AllResources
