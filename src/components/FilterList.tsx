import React from "react"
import { filterFields } from "./AllResources"
import { Resource } from "../utils/interfaces"
import Filter from "./Filter"

export interface AddToFilter {
  (partialFilter: Partial<filterFields>): void
}

const FilterList = ({
  filter,
  setFilter,
  dataStoreResults,
}: {
  filter: Partial<filterFields>
  setFilter: React.Dispatch<React.SetStateAction<Partial<filterFields>>>
  dataStoreResults: Array<Resource>
}) => {
  const distinctValues = calcDistinctValues(dataStoreResults, [
    "altersgruppe",
    "erscheinungsjahr",
  ])
  const altersgruppen = distinctValues.altersgruppe
  const erscheinungsjahre = distinctValues.erscheinungsjahr

  function addToFilter(partialFilter: Partial<filterFields>) {
    setFilter({ ...filter, ...partialFilter })
  }

  return (
    <div className="bg-[#F7F7F7] w-full flex flex-col py-4 px-6">
      <Filter
        filterKey="altersgruppe"
        values={altersgruppen}
        addToFilter={addToFilter}
      />
      <Filter
        filterKey="erscheinungsjahr"
        values={erscheinungsjahre}
        addToFilter={addToFilter}
      />
    </div>
  )
}

function calcDistinctValues(resourceArray: Array<Resource>, keys: string[]) {
  const distinctResults: { [k: string]: any } = {}
  keys.forEach(key => {
    const allKeyValues = resourceArray.reduce<string[]>((prev, cur, ind) => {
      const currentKeyValue: string | string[] = cur[key as keyof Resource]
      if (typeof currentKeyValue == "string") {
        return [...prev, currentKeyValue]
      } else {
        return [...prev, ...currentKeyValue]
      }
    }, [])
    distinctResults[key as keyof Object] = [...new Set(allKeyValues)]
  })
  return distinctResults
}

export default FilterList
