import React from "react"
import PropTypes, { InferProps } from "prop-types"
import { RiArticleFill } from "@react-icons/all-files/ri/RiArticleFill"
import { Resource } from "../utils/interfaces"

// TO DO PropTypes

// Props: https://stackoverflow.com/questions/59301171/is-not-assignable-to-type-intrinsicattributes-react-js-and-typescript-js
// Design: https://tailwindcomponents.com/component/tailwind-item-card, https://tailwindcomponents.com/component/article-news-card-1
const Card = ({ resource }: { resource: Resource }) => {
  const { id, thema, titel, url, format, beschreibung } = resource
  return (
    <div
      key={id}
      className="relative flex flex-col max-w-xs p-3 mx-auto space-y-3 bg-white border border-white shadow-lg md:flex-row md:space-x-5 md:space-y-0 rounded-xl md:max-w-3xl"
    >
      <div className="grid w-full bg-white md:w-1/3 place-items-center">
        <RiArticleFill size="4em" />
      </div>
      <div className="flex flex-col w-full p-3 space-y-2 bg-white md:w-2/3">
        <h3 className="text-xl font-black text-gray-800 md:text-3xl">
          {titel}
        </h3>
        <p className="text-base text-gray-500 md:text-lg">{beschreibung}</p>
        <div className="flex justify-between item-center">
          <p className="hidden font-medium text-gray-500 md:block">{thema}</p>
          {format.map((entry, index) => {
            return (
              <div
                key={index}
                className="hidden px-3 py-1 text-xs font-medium text-gray-800 bg-gray-200 rounded-full md:block"
              >
                {entry}
              </div>
            )
          })}
          <a className="text-blue-600 hover:underline" href={url}>
            Zur Website
          </a>
        </div>
      </div>
    </div>
  )
}

export default Card
