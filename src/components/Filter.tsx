import React from "react"
import { filterFields } from "./AllResources"
import { AddToFilter } from "./FilterList"

const Filter = ({
  filterKey,
  tag,
  values,
  addToFilter,
}: {
  filterKey: string
  tag: string
  values: string[]
  addToFilter: AddToFilter
}) => {
  return (
    <select
      id={filterKey}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      onChange={event => {
        addToFilter({ [filterKey as keyof filterFields]: event.target.value })
      }}
    >
      <option value="Alle" selected={true}>
        {tag}
      </option>
      {values &&
        values.length > 0 &&
        values.map((entry: string) => {
          return (
            <option value={entry || "Kein Eintrag"}>
              {entry || "Kein Eintrag"}
            </option>
          )
        })}
    </select>
  )
}

export default Filter
