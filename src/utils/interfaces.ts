export interface Resource {
  beschreibung: string;
  id: string;
  thema: Array<string>;
  titel: string;
  url: string;
  format: Array<string>;
  author: string;
  altersgruppe: Array<string>;
  erscheinungsjahr: string;
  herausgeber: string;
}

export interface PaginationProps {
  onPageChange: Function;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className: string;
}

export interface filterFields {
  altersgruppe: Array<string>;
  erscheinungsjahr: string;
  thema: Array<string>;
  format: Array<string>;
}

export interface searchResult {
  field: string;
  result: Array<string>;
}

export type Filter<T> = {
  [K in keyof T]?: T[K]; //| ((value: T[K]) => boolean);
};

export type SortOrder = 'asc' | 'desc';

export interface Sort {
  field: keyof Resource;
  order: SortOrder;
}

export interface Query<T> {
  search: string;
  filter: Filter<T>;
  sort: Sort;
}
