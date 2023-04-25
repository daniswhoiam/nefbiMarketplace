export interface Resource {
  beschreibung: string
  id: string
  thema: Array<string>
  titel: string
  url: string
  format: Array<string>
  author: string
  altersgruppe: Array<string>
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
  altersgruppe: Array<string>
  erscheinungsjahr: string
  thema: Array<string>
}

export interface searchResult {
  field: string
  result: Array<string>
}