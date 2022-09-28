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
  results,
}: {
  filter: Partial<filterFields>
  setFilter: React.Dispatch<React.SetStateAction<Partial<filterFields>>>
  results: Array<Resource>
}) => {
  const distinctValues = calcDistinctValues(results, [
    "altersgruppe",
    "erscheinungsjahr",
  ])
  const altersgruppen = distinctValues.altersgruppe
  const erscheinungsjahre = distinctValues.erscheinungsjahr
  const filterResetDisabled = Object.keys(filter).length === 0

  function addToFilter(partialFilter: Partial<filterFields>) {
    setFilter({ ...filter, ...partialFilter })
  }

  return (
    <div className="bg-[#F7F7F7] w-full flex flex-col py-4 px-6 gap-6">
      <Filter
        filterKey="altersgruppe"
        tag="Altersgruppe"
        values={altersgruppen}
        addToFilter={addToFilter}
      />
      <Filter
        filterKey="erscheinungsjahr"
        tag="Erscheinungsjahr"
        values={erscheinungsjahre}
        addToFilter={addToFilter}
      />
      {/* https://stackoverflow.com/questions/31163693/how-do-i-conditionally-add-attributes-to-react-components */}
      <button
        className="btn btn-secondary"
        disabled={filterResetDisabled}
        onClick={() => setFilter({})}
      >
        Filter zurücksetzen
      </button>
    </div>
  )
}

function calcDistinctValues(resourceArray: Array<Resource>, keys: string[]) {
  const distinctResults: { [k: string]: any } = {}
  keys.forEach(key => {
    const allKeyValues = resourceArray.reduce<string[]>((prev, cur) => {
      const currentKeyValue: string | string[] = cur[key as keyof Resource]
      if (typeof currentKeyValue == "string") {
        return [...prev, currentKeyValue]
      } else {
        return [...prev, ...currentKeyValue]
      }
    }, [])
    distinctResults[key as keyof Object] = [...new Set(allKeyValues)].sort()
  })
  return distinctResults
}

export default FilterList
