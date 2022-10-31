import React from "react"
import PropTypes from "prop-types"
import { Resource } from "../utils/interfaces"
import setupTags from "../utils/setupTags"

const TagListPropTypes = {
  resources: PropTypes.array,
}

const TagList = ({ resources = [] }: { resources: Array<Resource> }) => {
  const newTags = setupTags(resources)
  return (
    <div className="bg-[#F7F7F7] w-full flex flex-col py-4 px-6">
      {newTags.map((tag, index) => {
        const [text, value] = tag

        return (
          <p key={index} className="hidden font-medium text-gray-500 md:block">
            {text} ({value})
          </p>
        )
      })}
    </div>
  )
}

TagList.propTypes = TagListPropTypes

export default TagList
