import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import PropTypes from "prop-types"
import { Resource } from "../utils/interfaces"
import Card from "./Card"

const ResourcesListPropTypes = {
  resources: PropTypes.array,
}

const Items = ({ currentItems = [] }: { currentItems?: Array<Resource> }) => {
  return (
    <div className="w-full space-y-4">
      {currentItems &&
        currentItems.map((item, index) => (
          <Card resource={item} key={index} />
        ))}
    </div>
  );
}

// https://github.com/AdeleD/react-paginate
const ResourcesList = ({
  itemsPerPage,
  resources = [],
}: {
  itemsPerPage: number
  resources?: Array<Resource>
}) => {
  // We start with an empty list of items.
  // https://stackoverflow.com/questions/69602729/whats-the-correct-way-to-initailise-empty-states-in-react-with-typescript
  const [currentItems, setCurrentItems] = useState<Array<Resource> | undefined>(undefined)
  const [pageCount, setPageCount] = useState(0)
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    setCurrentItems(resources.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(resources.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => { // Pagination library puts state on event
    const newOffset = (event.selected * itemsPerPage) % resources.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col">
      <Items currentItems={currentItems} />
      <ReactPaginate
        className="flex py-8 px-12 justify-around"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
      />
    </div>
  );
}

ResourcesList.propTypes = ResourcesListPropTypes

export default ResourcesList
