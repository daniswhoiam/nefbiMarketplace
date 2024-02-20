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

export interface FilterFields {
  altersgruppe: Array<string>;
  erscheinungsjahr: string;
  thema: Array<string>;
  format: Array<string>;
}

export interface searchResult {
  field: string;
  result: Array<string>;
}

export type FilterType = 'AND' | 'OR';

type FiltersType =
  | 'equal'
  | 'not_equal'
  | 'empty'
  | 'not_empty'
  | 'contains'
  | 'contains_not'
  | 'single_select_equal'
  | 'single_select_not_equal';

export type Filters = {
  field: keyof FilterFields;
  type: FiltersType;
  value: string;
};

export type SortOrder = 'asc' | 'desc';

export interface Sort {
  field: keyof Resource;
  order: SortOrder;
}
