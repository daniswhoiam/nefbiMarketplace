import React from "react"
import PropTypes from "prop-types"
import { Resource } from "../utils/interfaces"
import Card from "./Card"

const ResourcesListPropTypes = {
  resources: PropTypes.array,
}

const ResourcesList = ({ resources = [] }: { resources?: Array<Resource> }) => {
  return (
    <div className="space-y-4 w-full">
      {resources?.map(resource => {
        return <Card resource={resource} />
      })}
    </div>
  )
}

ResourcesList.propTypes = ResourcesListPropTypes

export default ResourcesList
