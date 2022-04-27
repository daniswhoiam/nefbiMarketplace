import React from "react"
import PropTypes, { InferProps } from "prop-types"

const ResourcesListPropTypes = {
  resources: PropTypes.array,
}

type ResourcesListTypes = InferProps<typeof ResourcesListPropTypes>
const ResourcesList = ({ resources = [] }: ResourcesListTypes) => {
  return (
    <div>
      {resources?.map(resource => {
        const {
          id,
          thema,
          titel,
          url,
          format,
          beschreibung: { beschreibung },
        } = resource

        return <p>{titel}</p>
      })}
    </div>
  )
}

ResourcesList.propTypes = ResourcesListPropTypes

export default ResourcesList
