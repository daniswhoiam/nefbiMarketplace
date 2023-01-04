import React, { useMemo, useState, useEffect } from "react"
import TagList from "./TagList"
import FilterList from "./FilterList"
import ResourcesList from "./ResourcesList"
import Pagination from "./Pagination"
import { MdSearch } from "@react-icons/all-files/md/MdSearch"
import { Resource, filterFields, searchResult } from "../utils/interfaces"
import { Index } from "flexsearch"
const { Document } = require("flexsearch")

const PageSize = 6

const exampleResource = {
  beschreibung: "abcdef",
  id: "0",
  thema: ["abcdef"],
  titel: "abcdef",
  url: "abcdef",
  format: ["abcdef"],
  author: "abcdef",
  altersgruppe: "abcdef",
  erscheinungsjahr: "abcdef",
  herausgeber: "abcdef",
}

// https://tailwindcomponents.com/component/sidebar-2
const AllResources = (props: any) => {
  const [activeFilterTab, setActiveFilterTab] = useState("Filter")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  // https://stackoverflow.com/questions/39713349/make-all-properties-within-a-typescript-interface-optional ; Partial
  // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input ; thema Initialisierung
  const [filterObject, setFilterObject] = useState<Partial<filterFields>>({
    thema: [],
  })
  const [results, setResults] = useState<Array<Resource>>([])
  const [searchResults, setSearchResults] = useState<Array<Resource>>([])
  const [filteringResults, setFilteringResults] = useState<Array<Resource>>([])
  // Get query data
  const data: Array<Resource> = props.props.resources
  /*   const dataStoreResults: Array<Resource> = Object.values(
    data.localSearchData.store
  ) */

  const index = new Document({
    tokenize: "forward",
    document: {
      index: [
        "beschreibung",
        "thema",
        "titel",
        "url",
        "format",
        "author",
        "altersgruppe",
        "erscheinungsjahr",
        "herausgeber",
      ],
    },
  })

  data.forEach(el => index.add(el))

  // Search
  useEffect(() => {
    async function getResults() {
      const searchResults: searchResult[] = await index.search(searchQuery)
      const resultIDs = searchResults.reduce<string[]>((acc, cur) => {
        cur.result.forEach(result => {
          if (!acc.includes(result)) {
            acc.push(result)
          }
        })
        return acc
      }, [])
      let results = data.filter(resource => resultIDs.includes(resource.id))
      setSearchResults(results)
      if (filteringResults.length !== 0) {
        const filteredIDs: string[] = filteringResults.map(el => el.id)
        results = results.filter(resource => filteredIDs.includes(resource.id))
      }
      setResults(results)
    }

    if (searchQuery !== "") {
      getResults()
    }
  }, [searchQuery])

  // Filter
  useEffect(() => {
    // Only filter if filter object is filled
    // https://stackoverflow.com/questions/69010671/filter-an-array-of-objects-by-another-object-of-filters
    const filterBase = searchResults.length > 0 ? searchResults : data
    if (
      Object.keys(filterObject).length > 1 ||
      filterObject["thema"]!.length > 0
    ) {
      setResults(filterResults(filterBase, filterObject))
    } else {
      // If no filter is being set
      setResults(filterBase)
    }
  }, [filterObject])

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
              <button
                onClick={() => setActiveFilterTab(tab)}
                className="px-8 py-3 min-w-[10rem] text-white font-bold tracking-wider rounded-t-md bg-light-sea-green"
              >
                {tab}
              </button>
            )
          })}
        </div>
        <FilterList
          activeFilterTab={activeFilterTab}
          filter={filterObject}
          setFilter={setFilterObject}
          results={results}
        />
        <TagList
          activeFilterTab={activeFilterTab}
          filter={filterObject}
          setFilter={setFilterObject}
          resources={results}
        />
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

function filterResults(
  baseResults: Array<Resource>,
  filterObject: Partial<filterFields>
) {
  const filterResults = baseResults.filter((resource: Resource) => {
    let filterResult: boolean[] = []
    Object.keys(filterObject).forEach(key => {
      const filterValue = filterObject[key as keyof filterFields]
      // When filter is being removed, return all entries
      if (filterValue === "Alle") {
        filterResult.push(true)
        return
      }

      const resourceValue = resource[key as keyof Resource]
      // Comparison and handling if user filters for "no value" => show those without value
      if (Array.isArray(resourceValue)) {
        filterResult.push(handleResourceArray(resourceValue, filterValue))
      } else {
        if (filterValue === "Kein Eintrag") {
          filterResult.push(resourceValue === "")
        } else {
          filterResult.push(resourceValue === filterValue)
        }
      }
    })

    const allFiltersTrue = filterResult.every(val => val)

    return allFiltersTrue
  })

  return filterResults
}

function handleResourceArray(
  resourceValue: Array<any>,
  filterValue?: string | string[]
) {
  // https://linguinecode.com/post/how-to-solve-typescript-possibly-undefined-value
  if (filterValue === "Kein Eintrag") {
    return resourceValue.length == 0
  } else {
    if (Array.isArray(filterValue)) {
      return handleFilterArray(resourceValue, filterValue)
    } else {
      return resourceValue.includes(filterValue!)
    }
  }
}

function handleFilterArray(resourceValue: Array<any>, filterValue: string[]) {
  if (filterValue.length === 0) {
    return true
  } else {
    const filtered = filterValue.reduce<string[]>((prev, cur) => {
      if (resourceValue.includes(cur!)) {
        return [...prev, cur]
      } else {
        return prev
      }
    }, [])
    return filtered.length === filterValue.length
  }
}
