import React from "react"
import PropTypes, { InferProps } from "prop-types"
import { MdLaunch } from "@react-icons/all-files/md/MdLaunch"
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight"
import { MdKeyboardArrowDown } from "@react-icons/all-files/md/MdKeyboardArrowDown"
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
    beschreibung,
    author,
    altersgruppe,
    erscheinungsjahr,
    herausgeber,
  } = resource

  return (
    <article
      key={id}
      className="flex flex-col p-2 border border-solid rounded-lg"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="p-2 mb-0">{format[0]}</p>
        <a className="p-2" href={url}>
          <MdLaunch size="1rem" />
        </a>
      </div>
      {/* Titel */}
      <h3 className="font-sans text-lg normal-case line-clamp-2">{titel}</h3>
      {/* Beschreibung */}
      <p className="line-clamp-4">{beschreibung}</p>
      {/* Footer */}
      <div className="flex justify-between items-center">
        <button><MdKeyboardArrowRight className="inline-block"/> Mehr anzeigen</button>
        <p className="mb-0">{altersgruppe}</p>
      </div>
    </article>
  )
}

export default Card
