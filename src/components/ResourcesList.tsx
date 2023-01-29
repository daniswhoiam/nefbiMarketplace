import React from "react"
import PropTypes from "prop-types"
import { Resource } from "../utils/interfaces"
import Card from "./Card"

const ResourcesListPropTypes = {
  currentItems: PropTypes.array,
}

const ResourcesList = ({
  currentItems = [],
}: {
  currentItems?: Array<Resource>
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 grow">
      {currentItems &&
        currentItems.length > 0 &&
        currentItems?.map((resource, index) => {
          return <Card resource={resource} key={index} />
        })}
    </div>
  )
}

ResourcesList.propTypes = ResourcesListPropTypes

export default ResourcesList
