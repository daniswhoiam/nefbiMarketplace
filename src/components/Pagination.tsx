import React from "react"
import classnames from "classnames"
import { usePagination, DOTS } from "../hooks/usePagination"
import { PaginationProps } from "../utils/interfaces"
import styles from "../assets/css/Pagination.module.scss"

// TO DO PropTypes
// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}: PaginationProps) => {
  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) || []

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  // https://stackoverflow.com/questions/38382153/multiple-classnames-with-css-modules-and-react
  return (
    <ul
      className={classnames(styles["pagination-container"], {
        [className]: className,
      })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames(
          styles["pagination-item"],
          currentPage === 1 ? styles["disabled"] : ""
        )}
        onClick={onPrevious}
      >
        <div className={classnames(styles["arrow"], styles["left"])} />
      </li>
      {paginationRange.map(pageNumber => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className={styles["pagination-items"].dots}>&#8230;</li>
        }

        const isCurrent = pageNumber === currentPage

        // Render our Page Pills
        return (
          <li
            className={classnames(styles["pagination-item"], {
              "!bg-light-sea-green-light": isCurrent,
              "!text-white": isCurrent,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames(
          styles["pagination-item"],
          currentPage === lastPage ? styles["disabled"] : ""
        )}
        onClick={onNext}
      >
        <div className={classnames(styles["arrow"], styles["right"])} />
      </li>
    </ul>
  )
}

export default Pagination
