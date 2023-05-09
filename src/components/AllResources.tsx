import React, { useMemo, useState, useEffect } from "react"
import TagList from "./TagList"
import FilterList from "./FilterList"
import ResourcesList from "./ResourcesList"
import Pagination from "./Pagination"
import { MdSearch } from "@react-icons/all-files/md/MdSearch"
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose"
import { Resource, filterFields, searchResult } from "../utils/interfaces"
import { Index } from "flexsearch"
import { GoSettings } from "@react-icons/all-files/go/GoSettings"
import classNames from "classnames"
const { Document } = require("flexsearch")

const PageSize = 6

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
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false)
  // Get query data
  const data: Array<Resource> = props.props.resources

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
    <section className="grid min-h-[120vh] grid-cols-10 gap-4">
      <div className="col-span-10 p-2 lg:col-span-3 z-10">
        <label className="relative block">
          <span className="sr-only">Suche</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <MdSearch size="20px" color="#686868" />
          </span>
          <input
            className="flex h-11 w-full flex-row items-start rounded-lg border border-solid border-[#DADADA] bg-white py-4 pl-8 pr-2"
            type="search"
            placeholder="Suche"
            onChange={event => {
              setSearchQuery(event.target.value)
            }}
          />
        </label>
        <div
          className={classNames(
            {
              "fixed bottom-0 left-0 z-50 flex w-full flex-col items-end justify-end bg-grey-black bg-opacity-50 px-10 backdrop-blur-sm":
                mobileSettingsOpen,
            },
            { hidden: !mobileSettingsOpen },
            "h-full lg:block lg:pb-[50%]"
          )}
        >
          <button
            className={classNames(
              { "relative bg-white p-6": mobileSettingsOpen },
              { hidden: !mobileSettingsOpen }
            )}
            onClick={() => setMobileSettingsOpen(!mobileSettingsOpen)}
          >
            <FaWindowClose
              className="absolute -left-2.5 -top-1.5"
              size="60px"
              color="rgb(40,40,40)"
            />
          </button>
          {/* Tab Buttons */}
          <div className="mt-4 flex w-full items-center justify-between">
            {filterTabs.map(tab => {
              return (
                <button
                  onClick={() => setActiveFilterTab(tab)}
                  className="min-w-[10rem] rounded-t-md bg-light-sea-green px-8 py-3 font-bold tracking-wider text-white"
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
      </div>
      <div className="col-span-10 flex flex-col justify-between p-2 lg:col-span-7">
        <div className="mb-4 flex lg:mb-0">
          <button
            className={classNames(
              { "  text-light-sea-green ": !mobileSettingsOpen },
              { "  bg-light-sea-green text-white ": mobileSettingsOpen },
              "mr-4 rounded-lg border-2 border-light-sea-green font-bold lg:hidden"
            )}
            onClick={() => setMobileSettingsOpen(!mobileSettingsOpen)}
          >
            <GoSettings className="h-[24px]" size="3rem" />
          </button>
          <h4 className="h-11 font-sans text-lg font-medium leading-10">
            {Math.max(currentData?.length, results?.length)} Ergebnisse
          </h4>
        </div>
        {noResults ? (
          <div className="grow">Es gibt keine Ergebnisse für diese Suche.</div>
        ) : (
          <div className="flex grow flex-col">
            <ResourcesList currentItems={currentData} />
            <Pagination
              className="pagination-bar mt-8"
              currentPage={currentPage}
              totalCount={results.length}
              pageSize={PageSize}
              siblingCount={2}
              onPageChange={(page: number) => {
                setCurrentPage(page)
                window.scrollTo(0, 0)
              }}
            />
          </div>
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
