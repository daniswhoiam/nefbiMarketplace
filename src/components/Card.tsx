import React, { useEffect, useState } from "react"
import PropTypes, { InferProps } from "prop-types"
import { MdLaunch } from "@react-icons/all-files/md/MdLaunch"
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight"
import { MdKeyboardArrowDown } from "@react-icons/all-files/md/MdKeyboardArrowDown"
import classNames from "classnames"
import { Resource } from "../utils/interfaces"
import Modal from "./Modal"

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

  const [modalShown, setModalShown] = useState(false)

  return (
    <article
      key={id}
      className="flex flex-col justify-between rounded-lg border border-solid border-light-sea-green border-opacity-30 bg-[#F7F7F7] bg-opacity-25 p-4 max-h-[22rem]"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="mb-0 rounded-lg border border-solid border-atomic-tangerine-light bg-white py-2 px-4 font-medium">
          {format[0]}
        </p>
        <a
          className="mb-0 flex gap-2 rounded-lg bg-atomic-tangerine-light py-2 px-4"
          href={url}
        >
          <p className="m-0 font-bold md:block hidden">Zur Webseite</p>
          <MdLaunch className="h-[21px]" size="1rem" />
        </a>
      </div>
      {/* Titel */}
      <h3 className="mt-6 mb-8 font-sans md:text-lg text-base font-bold normal-case line-clamp-3">
        {titel}
      </h3>
      {/* Beschreibung */}
      <p className="line-clamp-4 md:text-sm text-xs">{beschreibung}</p>
      {/* Footer */}
      <div className="mt-2 flex items-center justify-between min-h-[37px]">
        <button
          className="flex items-center underline underline-offset-2"
          onClick={() => setModalShown(true)}
        >
          <MdKeyboardArrowRight className="inline-block" /> Mehr anzeigen
        </button>
        <p
          className={classNames("mb-0", {
            "rounded-lg bg-light-sea-green py-2 px-4 text-white": altersgruppe,
          })}
        >
          {altersgruppe}
        </p>
      </div>
      <Modal resource={resource} show={modalShown} setModalShown={setModalShown} />
    </article>
  )
}

export default Card
