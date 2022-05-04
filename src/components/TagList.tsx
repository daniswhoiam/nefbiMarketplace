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
    <div className="md:flex w-2/5 md:w-1/4 h-screen border-r hidden">
      <h4>tags</h4>
      <div>
        {newTags.map((tag, index) => {
          const [text, value] = tag

          return (
            <p>
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
