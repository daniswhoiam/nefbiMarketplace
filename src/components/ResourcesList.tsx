import React from "react"
import PropTypes from "prop-types"
import { Resource } from "../utils/interfaces"
import Card from "./Card"

const ResourcesListPropTypes = {
  resources: PropTypes.array,
}

const ResourcesList = ({ resources = [] }: { resources?: Array<Resource> }) => {
  return (
    <div className="w-full space-y-4">
      {resources?.map((resource, index) => {
        return <Card resource={resource} key={index} />
      })}
    </div>
  )
}

ResourcesList.propTypes = ResourcesListPropTypes

export default ResourcesList
