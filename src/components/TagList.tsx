import React from "react"
import PropTypes, { InferProps } from "prop-types"
import { Resource } from "../utils/interfaces"
import setupTags from "../utils/setupTags"

const TagListPropTypes = {
  resources: PropTypes.array,
}

const TagList = ({ resources = [] }: { resources?: Array<Resource> }) => {
  const newTags = setupTags(resources)
  return (
    <div>
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
