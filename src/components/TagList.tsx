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
    <div className="md:flex flex-col w-2/5 md:w-1/4 h-screen border-r hidden">
      <h3 className="font-black text-gray-800 md:text-3xl text-xl mb-5">Themen</h3>
      <div className="flex flex-col gap-y-3">
        {newTags.map((tag, index) => {
          const [text, value] = tag

          return (
            <p className="text-gray-500 font-medium hidden md:block">
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
