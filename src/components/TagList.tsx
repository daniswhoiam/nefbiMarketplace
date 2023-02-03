import React from "react"
import PropTypes from "prop-types"
import { Resource, filterFields } from "../utils/interfaces"
import setupTags from "../utils/setupTags"
import classNames from "classnames"
import { removeFromFilter, addToFilter } from "../utils/handleFilter"
import { removeItem } from "../utils/helperFunctions"

const TagListPropTypes = {
  resources: PropTypes.array,
}

const TagList = ({
  filter,
  setFilter,
  resources = [],
  activeFilterTab,
}: {
  filter: Partial<filterFields>
  setFilter: React.Dispatch<React.SetStateAction<Partial<filterFields>>>
  resources: Array<Resource>
  activeFilterTab: string
}) => {
  const newTags = setupTags(resources)

  // https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value ; Event Type
  // https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked ; If checkbox is checked
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let themen = [event.target.value]
    if (event.target.checked) {
      if ("thema" in filter) {
        // https://bobbyhadz.com/blog/typescript-type-undefined-must-have-symbol-iterator ; Solve iterable problem
        themen = [...themen, ...(filter["thema"] || [])]
      }
      setFilter(addToFilter(filter, { thema: themen }))
    } else {
      themen = [...(filter["thema"] || [])]
      if (themen.includes(event.target.value)) {
        themen = removeItem(themen, event.target.value)
        setFilter(
          addToFilter(removeFromFilter(filter, "thema"), { thema: themen })
        )
      }
    }
  }

  return (
    <div
      className={classNames(
        "flex w-full flex-col gap-6 bg-[#F7F7F7] py-4 px-6 lg:h-full",
        {
          ["hidden"]: activeFilterTab !== "Themen",
        }
      )}
    >
      {newTags.map((tag, index) => {
        const [text, value] = tag

        return (
          <div className="flex items-center">
            {/*https://bobbyhadz.com/blog/react-check-if-checkbox-is-checked*/}
            <input
              value={text}
              type="checkbox"
              onChange={handleChange}
              checked={filter["thema"]?.includes(text as string)}
            />
            <p
              key={index}
              className="text-gray-500 mb-0 ml-2 hidden font-medium leading-6 md:flex"
            >
              {text} ({value})
            </p>
          </div>
        )
      })}
    </div>
  )
}

TagList.propTypes = TagListPropTypes

export default TagList
