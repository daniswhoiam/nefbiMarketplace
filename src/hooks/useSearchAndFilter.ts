import React, { useMemo } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { Resource, filterFields } from "../utils/interfaces"

function useSearchAndFilter(
  searchQuery: string,
  searchIndex: any,
  searchStore: any,
  filterObject: Partial<filterFields>,
  dataResults: Array<Resource>
): Array<Resource> {
  // Search hook
  const searchResults: Array<Resource> = useFlexSearch(
    searchQuery,
    searchIndex,
    searchStore
  )

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
    if (
      Object.keys(filterObject).length > 1 ||
      filterObject["thema"]!.length > 0
    ) {
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
              if (Array.isArray(filterValue)) {
                if (filterValue.length === 0) {
                  filterResult = true
                } else {
                  const filtered = filterValue.reduce<string[]>((prev, cur) => {
                    if (resourceValue.includes(cur!)) {
                      return [...prev, cur]
                    } else {
                      return prev
                    }
                  }, [])
                  filterResult = filtered.length === filterValue.length
                }
              } else {
                filterResult = resourceValue.includes(filterValue!)
              }
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

export default useSearchAndFilter
