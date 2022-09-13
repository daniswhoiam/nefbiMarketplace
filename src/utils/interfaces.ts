export interface Resource {
  beschreibung: string
  id: string
  thema: Array<string>
  titel: string
  url: string
  format: Array<string>
}

export interface PaginationProps {
  onPageChange: Function,
  totalCount: number,
  siblingCount: number,
  currentPage: number,
  pageSize: number,
  className: string
}
