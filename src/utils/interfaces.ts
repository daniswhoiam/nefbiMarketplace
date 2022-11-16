export interface Resource {
  beschreibung: string
  id: string
  thema: Array<string>
  titel: string
  url: string
  format: Array<string>
  author: string
  altersgruppe: string
  erscheinungsjahr: string
  herausgeber: string
}

export interface PaginationProps {
  onPageChange: Function,
  totalCount: number,
  siblingCount: number,
  currentPage: number,
  pageSize: number,
  className: string
}

export interface filterFields {
  altersgruppe: string
  erscheinungsjahr: string
  thema: Array<string>
}