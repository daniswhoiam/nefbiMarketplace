import React from "react"
import classnames from "classnames"
import { usePagination, DOTS } from "../hooks/usePagination"
import { PaginationProps } from "../utils/interfaces"
import styles from "../assets/css/Pagination.module.scss"

// TO DO PropTypes

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
        className={classnames(styles["pagination-item"], {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className={styles.arrow.left} />
      </li>
      {paginationRange.map(pageNumber => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className={styles["pagination-items"].dots}>&#8230;</li>
        }

        // Render our Page Pills
        return (
          <li
            className={classnames(styles["pagination-item"], {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames(styles["pagination-item"], {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className={styles.arrow.right} />
      </li>
    </ul>
  )
}

export default Pagination
