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
      return filterResults(baseResults, filterObject)
    } else {
      // If no filter is being set
      return baseResults
    }
  }, [searchQuery, filterObject])
}

export default useSearchAndFilter

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
