import {FilterFields, FilterType, Filters} from '../utils/interfaces';

export class Filter {
  private filterType: FilterType;
  private filters: Filters[];
  private groups: Array<Filter>;

  constructor(
    filterType: FilterType = 'AND',
    filters: Filters[] = [],
    groups: Array<Filter> = [],
  ) {
    this.filterType = filterType;
    this.filters = filters;
    this.groups = groups;
  }

  /**
   * Recursively get the included fields in the Filter, including the ones in the group Filters.
   * @returns Array<keyof FilterFields>
   */
  getIncludedFields(): Array<keyof FilterFields> {
    const includedFields: Set<keyof FilterFields> = new Set();

    const calcIncludedFields = (filter: Filter) => {
      filter.filters.forEach(filter => {
        includedFields.add(filter.field);
      });

      filter.groups.forEach(group => {
        calcIncludedFields(group);
      });
    };

    calcIncludedFields(this);

    return Array.from(includedFields);
  }

  /**
   * Check if a Filter has a specific field included.
   * @param field - The field to check for.
   * @returns boolean
   */
  hasIncludedField(field: keyof FilterFields) {
    return this.getIncludedFields().includes(field);
  }

  /**
   * Get a Filter's FilterType.
   * @returns FilterType
   */
  getFilterType() {
    return this.filterType;
  }

  /**
   * Set a Filter's FilterType.
   * @param newFilterType - The new FilterType.
   */
  setFilterType(newFilterType: FilterType) {
    this.filterType = newFilterType;
  }

  /**
   * Get the currently set Filters elements in the Filter.
   * @returns Filters[]
   */
  getAllFilters() {
    return this.filters;
  }

  /**
   * Get the currently set Filters elements in the Filter by field.
   * @param filterKey - The field to filter by.
   * @returns Filters[]
   */
  getFiltersByField(filterKey: keyof FilterFields) {
    return this.filters.filter(field => field.field === filterKey);
  }

  /**
   * Get a specific Filters element in the Filter.
   * @param filters - The Filters element to get.
   * @returns Filters
   */
  getSpecificFilters(filters: Filters) {
    return this.filters.find(el => el === filters);
  }

  /**
   * Set the currently set Filters elements in the Filter.
   * @param newFilters - The new Filters elements.
   */
  setFilters(newFilters: Filters[]) {
    this.filters = newFilters;
  }

  /**
   * Add a Filters element to the Filter.
   * @param newFilters - The new Filters element.
   */
  addToFilters(newFilters: Filters) {
    // Filter kombinieren; Feld hinzufügen bzw. vorherigen Wert überschreiben
    this.filters = [...this.filters, newFilters];
  }

  /**
   * Remove all Filters elements from the Filter.
   */
  removeAllFilters() {
    this.filters = [];
  }

  /**
   * Remove Filters elements from the Filter by field.
   * @param filterField - The field to choose which Filters to remove.
   */
  removeFiltersByField(filterField: keyof FilterFields) {
    this.filters = this.filters.filter(field => field.field !== filterField);
  }

  /**
   * Remove a specific Filters element from the Filter.
   * @param filters - The Filters element to remove.
   */
  removeSpecificFilters(filters: Filters) {
    this.filters = this.filters.filter(el => JSON.stringify(el) !== JSON.stringify(filters));
  }

  /**
   * Check if the Filter has any Filters elements.
   * @returns boolean
   */
  hasFilters() {
    return this.filters.length > 0;
  }

  /**
   * Get the Filter groups.
   * @returns Array<Filter>
   */
  getGroups() {
    return this.groups;
  }

  /**
   * Set the Filter groups.
   * @param newGroups - The new Filter groups.
   */
  setGroups(newGroups: Array<Filter>) {
    this.groups = newGroups;
  }

  /**
   * Add a Filter group.
   * @param newGroup - The new Filter group.
   */
  addToGroups(newGroup: Filter) {
    this.groups = [...this.groups, newGroup];
  }

  /**
   * Get a Filter group by field if it exists or create such a group - by default an OR filter.
   * @param filterField - The field to choose which Filter group to get.
   * @returns Filter
   */
  getOrAddToGroups(filterField: keyof FilterFields) {
    let group = this.groups.find(group => group.hasIncludedField(filterField));

    if (!group) {
      group = new Filter('OR');
      this.addToGroups(group);
    }

    return group;
  }

  /**
   * Remove all Filter groups.
   */
  removeAllGroups() {
    this.groups = [];
  }

  /**
   * Remove a specific Filter group.
   * @param group - The Filter group to remove.
   */
  removeSpecificGroup(group: Filter) {
    this.groups = this.groups.filter(el => el !== group);
  }

  /**
   * Remove a Filter group by field.
   * @param filterField - The field to choose which Filter group to remove.
   */
  removeGroupByField(filterField: keyof FilterFields) {
    this.groups = this.groups.filter(group => !group.hasIncludedField(filterField));
  }

  /**
   * Check if the Filter has any Group elements.
   * @returns boolean
   */
  hasGroups() {
    return this.groups.length > 0;
  }
}
