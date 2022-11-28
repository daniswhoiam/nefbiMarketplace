import React, { useMemo, useState, useEffect } from "react"
import TagList from "./TagList"
import FilterList from "./FilterList"
import ResourcesList from "./ResourcesList"
import Pagination from "./Pagination"
import { MdSearch } from "@react-icons/all-files/md/MdSearch"
import { Resource, filterFields } from "../utils/interfaces"
import useSearchAndFilter from "../hooks/useSearchAndFilter"

const PageSize = 6

// https://tailwindcomponents.com/component/sidebar-2
const AllResources = () => {
  const [activeFilterTab, setActiveFilterTab] = useState("Filter")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  // https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional ; Partial
  // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input ; thema Initialisierung
  const [filterObject, setFilterObject] = useState<Partial<filterFields>>({thema: []})
  // Get query data
  const data = []
  const dataStoreResults: Array<Resource> = Object.values(data.localSearchData.store)
  // Hook up search and filter functionality
  const results = useSearchAndFilter(
    searchQuery,
    data.localSearchData.index,
    data.localSearchData.store,
    filterObject,
    dataStoreResults
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
              <button onClick={() => setActiveFilterTab(tab)} className="px-6 py-1 text-white rounded-t-md bg-light-sea-green">
                {tab}
              </button>
            )
          })}
        </div>
        <FilterList activeFilterTab={activeFilterTab} filter={filterObject} setFilter={setFilterObject} results={results} />
        <TagList activeFilterTab={activeFilterTab} filter={filterObject} setFilter={setFilterObject} resources={results}  />
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

export default AllResources
