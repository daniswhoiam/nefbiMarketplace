import {Resource, filterFields, Query, Filter} from '../utils/interfaces';

function addToFilter(
  filter: Filter<Resource>,
  partialFilter: Partial<filterFields>,
) {
  // Filter kombinieren; Feld hinzufügen bzw. vorherigen Wert überschreiben
  return {...filter, ...partialFilter};
}

export {addToFilter};

function removeFromFilter(
  filter: Filter<Resource>,
  filterkey: keyof filterFields,
) {
  // Kopie des aktuellen Filters erstellen
  const newFilter: Filter<Resource> = {...filter};
  // Falls Feld vorhanden, entfernen
  if (newFilter[filterkey]) {
    delete newFilter[filterkey];
  }
  return newFilter;
}

export {removeFromFilter};

function getFilterField(
  filter: Filter<Resource>,
  filterKey: keyof filterFields,
) {
  return filter[filterKey];
}

export {getFilterField};

// What to do with this?
function modifyFilter(
  filter: Filter<Resource>,
  filterkey: keyof filterFields,
  newValue: Partial<Filter<Resource>>,
) {}

function sortResources(resources: Array<Resource>, sortKey: string) {
  let resourcesSorted;
  switch (sortKey) {
    case 'rel':
      resourcesSorted = resources.sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
      return resourcesSorted;
    case 'titelAsc':
      resourcesSorted = resources.sort((a, b) => {
        return a.titel < b.titel ? -1 : a.titel > b.titel ? 1 : 0;
      });
      return resourcesSorted;
    case 'titelDesc':
      resourcesSorted = resources.sort((a, b) => {
        return a.titel > b.titel ? -1 : a.titel < b.titel ? 1 : 0;
      });
      return resourcesSorted;
    case 'yearAsc':
      resourcesSorted = resources.sort((a, b) => {
        return a.erscheinungsjahr < b.erscheinungsjahr
          ? -1
          : a.erscheinungsjahr > b.erscheinungsjahr
          ? 1
          : 0;
      });
      return resourcesSorted;
    case 'yearDesc':
      resourcesSorted = resources.sort((a, b) => {
        return a.erscheinungsjahr > b.erscheinungsjahr
          ? -1
          : a.erscheinungsjahr < b.erscheinungsjahr
          ? 1
          : 0;
      });
      return resourcesSorted;
    default:
      resourcesSorted = resources;
      return resourcesSorted;
  }
}

export {sortResources};
