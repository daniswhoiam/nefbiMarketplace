import React from "react"
import PropTypes, { InferProps } from "prop-types"
import { RiArticleFill } from "@react-icons/all-files/ri/RiArticleFill"
import { Resource } from "../utils/interfaces"

// TO DO PropTypes

// Props: https://stackoverflow.com/questions/59301171/is-not-assignable-to-type-intrinsicattributes-react-js-and-typescript-js
// Design: https://tailwindcomponents.com/component/tailwind-item-card, https://tailwindcomponents.com/component/article-news-card-1
const Card = ({ resource }: { resource: Resource }) => {
  const {
    id,
    thema,
    titel,
    url,
    format,
    beschreibung: { beschreibung },
  } = resource
  return (
    <div
      key={id}
      className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white"
    >
      <div className="w-full md:w-1/3 bg-white grid place-items-center">
        <RiArticleFill />
      </div>
      <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
        <h3 className="font-black text-gray-800 md:text-3xl text-xl">
          {titel}
        </h3>
        <p className="md:text-lg text-gray-500 text-base">{beschreibung}</p>
        <div className="flex justify-between item-center">
          <p className="text-gray-500 font-medium hidden md:block">{thema}</p>
          {format.map(entry => {
            return (
              <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
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
