import React from "react"
import PropTypes from "prop-types"
import { Resource } from "../utils/interfaces"
import setupTags from "../utils/setupTags"

const TagListPropTypes = {
  resources: PropTypes.array,
}

const TagList = ({ resources = [] }: { resources?: Array<Resource> }) => {
  const newTags = setupTags(resources)
  return (
    <div className="flex-col hidden w-2/5 h-screen border-r md:flex md:w-1/4">
      <h3 className="mb-5 text-xl font-black text-gray-800 md:text-3xl">
        Themen
      </h3>
      <div className="flex flex-col gap-y-3">
        {newTags.map((tag, index) => {
          const [text, value] = tag

          return (
            <p
              key={index}
              className="hidden font-medium text-gray-500 md:block"
            >
              {text} ({value})
            </p>
          )
        })}
      </div>
    </div>
  )
}

TagList.propTypes = TagListPropTypes

export default TagList
