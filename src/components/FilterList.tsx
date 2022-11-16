import React, { useMemo } from "react"
import Select, { ActionMeta, SingleValue } from "react-select"
import { Resource, filterFields } from "../utils/interfaces"
import { array } from "prop-types"
import classNames from "classnames"
import { removeFromFilter, addToFilter } from "../utils/handleFilter"

export interface AddToFilter {
  (partialFilter: Partial<filterFields>): void
}

const FilterList = ({
  filter,
  setFilter,
  results,
  activeFilterTab
}: {
  filter: Partial<filterFields>
  setFilter: React.Dispatch<React.SetStateAction<Partial<filterFields>>>
  results: Array<Resource>,
  activeFilterTab: string
}) => {
  let distinctValues = calcDistinctValues(results, [
    "altersgruppe",
    "erscheinungsjahr",
  ])
  const altersgruppen = distinctValues.altersgruppe
  const altersgruppenOptions = resultsToOptions(altersgruppen)
  const erscheinungsjahre = distinctValues.erscheinungsjahr
  const erscheinungsjahreOptions = resultsToOptions(erscheinungsjahre)
  // Why does deconstruct not work?
  const filterResetDisabled = Object.keys(filter).length === 0

  distinctValues = useMemo(() => {
    return calcDistinctValues(results, ["altersgruppe", "erscheinungsjahr"])
  }, [filter])


  function handleFilterChange(
    newValue: SingleValue<{ value: string }>,
    triggerAction: ActionMeta<{ value: string }>,
    filterField: keyof filterFields
  ) {
    let value: string | undefined
    if (newValue === null || newValue === undefined) {
      value = undefined
    } else {
      value = newValue.value
    }
    // https://github.com/JedWatson/react-select/issues/1309
    if (triggerAction.action === "clear") {
      setFilter(removeFromFilter(filter, filterField))
    } else {
      setFilter(addToFilter(filter, { [filterField as keyof filterFields]: value }))
    }
  }

  return (
    <div className={classNames("bg-[#F7F7F7] w-full flex flex-col py-4 px-6 gap-6", {["hidden"]: activeFilterTab !== "Filter"})}>
      <Select
        options={altersgruppenOptions}
        placeholder="Altersgruppen"
        onChange={(newValue: SingleValue<{ value: string }>, triggerAction) => {
          handleFilterChange(newValue, triggerAction, "altersgruppe")
        }}
        isClearable={true}
      />
      <Select
        options={erscheinungsjahreOptions}
        placeholder="Erscheinungsjahr"
        onChange={(newValue: SingleValue<{ value: string }>, triggerAction) => {
          handleFilterChange(newValue, triggerAction, "erscheinungsjahr")
        }}
        isClearable={true}
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

function resultsToOptions(arr: Array<any>) {
  return arr.map((val: any) => {
    return {
      value: val == "" ? "Kein Eintrag" : val,
      label: val == "" ? "Kein Eintrag" : val,
    }
  })
}

export default FilterList
