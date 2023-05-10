import React, { useMemo, useRef, useState } from "react"
import Select, { ActionMeta, SingleValue } from "react-select"
import { Resource, filterFields } from "../utils/interfaces"
import { array } from "prop-types"
import classNames from "classnames"
import { removeFromFilter, addToFilter } from "../utils/handleFilter"
import { FORMATS } from "../utils/constants"

export interface AddToFilter {
  (partialFilter: Partial<filterFields>): void
}
interface Option {
  value: string
  label: string
}

const FilterList = ({
  filter,
  setFilter,
  setSorting,
  results,
  activeFilterTab,
}: {
  filter: Partial<filterFields>
  setFilter: React.Dispatch<React.SetStateAction<Partial<filterFields>>>
  setSorting: React.Dispatch<React.SetStateAction<string>>
  results: Array<Resource>
  activeFilterTab: string
}) => {
  let distinctValues = calcDistinctValues(results, [
    "altersgruppe",
    "erscheinungsjahr",
    "format",
  ])
  const altersgruppen = distinctValues.altersgruppe
  const altersgruppenOptions = resultsToOptions(altersgruppen)
  const erscheinungsjahre = distinctValues.erscheinungsjahr
  const erscheinungsjahreOptions = resultsToOptions(erscheinungsjahre)
  const formate = distinctValues.format
  const formateOptions = resultsToOptions(formate)
  // Why does deconstruct not work?
  const filterResetDisabled = Object.keys(filter).length === 0
  const altersgruppeRef = useRef<any>()
  const erscheinungsjahrRef = useRef<any>()
  const sortOptions = [
    { value: "rel", label: "Relevanz" },
    { value: "titelAsc", label: "Alphabetisch - aufsteigend" },
    { value: "titelDesc", label: "Alphabetisch - absteigend" },
    { value: "yearAsc", label: "Erscheinungsjahr - aufsteigend" },
    { value: "yearDesc", label: "Erscheinungsjahr - absteigend" },
  ]

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
      setFilter(
        addToFilter(filter, { [filterField as keyof filterFields]: value })
      )
    }
  }

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-6 bg-[#F7F7F7] px-6 py-4 lg:h-full",
        { ["hidden"]: activeFilterTab !== "Filter" }
      )}
    >
      <label htmlFor="altersgruppe">Altersgruppen</label>
      <Select
        id="altersgruppe"
        name="altersgruppe"
        ref={altersgruppeRef}
        options={altersgruppenOptions}
        placeholder="Alle Altersgruppen"
        onChange={(newValue: SingleValue<{ value: string }>, triggerAction) => {
          handleFilterChange(newValue, triggerAction, "altersgruppe")
        }}
        isClearable={true}
      />
      <Divider />
      <label htmlFor="erscheinungjahr">Erscheinungsjahr</label>
      <Select
        id="erscheinungsjahr"
        name="erscheinungsjahr"
        ref={erscheinungsjahrRef}
        options={erscheinungsjahreOptions}
        placeholder="Alle Erscheinungsjahre"
        onChange={(newValue: SingleValue<{ value: string }>, triggerAction) => {
          handleFilterChange(newValue, triggerAction, "erscheinungsjahr")
        }}
        isClearable={true}
      />
      <Divider />
      <label htmlFor="formate">Formate</label>
      <div className="flex flex-row flex-wrap gap-2">
        {FORMATS.map((option: Option) => (
          <Format format={option} filter={filter} setFilter={setFilter} />
        ))}
      </div>
      <Divider />
      <label htmlFor="sortierung">Sortieren nach</label>
      <Select
        id="sortierung"
        name="sortierung"
        placeholder="Auswählen"
        options={sortOptions}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
        onChange={option => {
          setSorting(option!.value)
        }}
      />
      <Divider />
      {/* https://stackoverflow.com/questions/31163693/how-do-i-conditionally-add-attributes-to-react-components */}
      <button
        className="btn btn-secondary"
        disabled={filterResetDisabled}
        onClick={() => {
          altersgruppeRef.current.clearValue()
          erscheinungsjahrRef.current.clearValue()
          setFilter({ thema: [] })
        }}
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
    } satisfies Option
  })
}

const Divider = () => {
  //https://larainfo.com/blogs/tailwind-css-divider-line-example
  return <span className="h-[1px] w-full bg-[#DADADA]"></span>
}

const Format = ({
  format,
  filter,
  setFilter,
}: {
  format: Option
  filter: Partial<filterFields>
  setFilter: React.Dispatch<React.SetStateAction<Partial<filterFields>>>
}) => {
  const [active, setActive] = useState(false)

  return (
    <button
      className={classNames(
        "rounded-md border-2 border-solid border-light-sea-green-light p-2 font-bold text-light-sea-green-light",
        { ["bg-white"]: !active },
        { ["bg-light-sea-green-light"]: active },
        { ["bg-opacity-10"]: active }
      )}
      onClick={() => {
        if (active) {
          setFilter(removeFromFilter(filter, "format" as keyof filterFields))
        } else {
          setFilter(
            addToFilter(filter, {
              ["format" as keyof filterFields]: format.value,
            })
          )
        }
        setActive(!active)
      }}
    >
      {format.label}
    </button>
  )
}

export default FilterList
