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
    localSearchData {
      index
      store
    }
  }
`

const PageSize = 6

export interface filterFields {
  altersgruppe: string
  erscheinungsjahr: string
}

// https://tailwindcomponents.com/component/sidebar-2
const AllResources = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  // https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional
  const [filterObject, setFilterObject] = useState<Partial<filterFields>>({})
  // Get query data
  const data = useStaticQuery(query)
  // Hook up search and filter functionality
  let results = useSearchAndFilter(
    searchQuery,
    data.localSearchData.index,
    data.localSearchData.store,
    filterObject
  )
  const filterTabs = ["Filter", "Themen"]
  const noResults = results.length === 0

  // Data to be displayed on the current page
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return results.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, results])

  // If search or filter changes, always go back to page one
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterObject])

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
        <Filter setFilter={setFilterObject} />
      </div>
      <div className="col-span-7 p-2">
        <h4 className="font-sans text-lg font-medium leading-10 h-11">
          {Math.max(currentData?.length, results?.length)} Ergebnisse
        </h4>
        {noResults ? (
          <div>Es gibt keine Ergebnisse für diese Suche.</div>
        ) : (
          <>
            <ResourcesList currentItems={currentData} />
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={results.length}
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

// Search and filter custom hook
function useSearchAndFilter(
  searchQuery: string,
  searchIndex: any,
  searchStore: any,
  filterObject: Partial<filterFields>
): Array<Resource> {
  // All data (query data)
  const dataResults: Array<Resource> = Object.values(searchStore)

  // Search hook
  const searchResults: Array<Resource> = useFlexSearch(searchQuery, searchIndex, searchStore)

  return useMemo(() => {
    // If a search is carried out and the results are empty, filtering does not make sense
    if (searchQuery !== "" && searchResults.length === 0) {
      return []
    }

    // If successful search has been performed, use filters on search result
    const baseResults =
      searchResults && searchResults.length > 0 ? searchResults : dataResults

    // Only filter if filter object is filled
    // https://stackoverflow.com/questions/69010671/filter-an-array-of-objects-by-another-object-of-filters
    if (Object.keys(filterObject).length > 0) {
      const filterResults = baseResults.filter((resource: Resource) => {
        let filterResult = false
        Object.keys(filterObject).every(key => {
          const filterValue = filterObject[key as keyof filterFields]
          // When filter is being removed, return all entries
          if (filterValue === "Alle") {
            filterResult = true
            return
          }
          const resourceValue = resource[key as keyof Resource]
          // Comparison and handling if user filters for "no value" => show those without value
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
      return filterResults
    } else {
      // If no filter is being set
      return baseResults
    }
  }, [searchQuery, filterObject])
}

export default AllResources
