import { Resource, filterFields } from "../utils/interfaces"

function addToFilter(
  filter: Partial<filterFields>,
  partialFilter: Partial<filterFields>
) {
  // Filter kombinieren; Feld hinzufügen bzw. vorherigen Wert überschreiben
  return { ...filter, ...partialFilter }
}

export { addToFilter }

function removeFromFilter(
  filter: Partial<filterFields>,
  filterkey: keyof filterFields
) {
  // Kopie des aktuellen Filters erstellen
  let newFilter: Partial<filterFields> = { ...filter }
  // Falls Feld vorhanden, entfernen
  if (newFilter[filterkey]) {
    delete newFilter[filterkey]
  }
  return newFilter
}

export { removeFromFilter }

function sortResources(resources: Array<Resource>, sortKey: string) {
  let resourcesSorted
  switch (sortKey) {
    case "rel":
      resourcesSorted = resources.sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
      })
      return resourcesSorted
    case "titelAsc":
      resourcesSorted = resources.sort((a, b) => {
        return a.titel < b.titel ? -1 : a.titel > b.titel ? 1 : 0
      })
      return resourcesSorted
    case "titelDesc":
      resourcesSorted = resources.sort((a, b) => {
        return a.titel > b.titel ? -1 : a.titel < b.titel ? 1 : 0
      })
      return resourcesSorted
    case "yearAsc":
      resourcesSorted = resources.sort((a, b) => {
        return a.erscheinungsjahr < b.erscheinungsjahr
          ? -1
          : a.erscheinungsjahr > b.erscheinungsjahr
          ? 1
          : 0
      })
      return resourcesSorted
    case "yearDesc":
      resourcesSorted = resources.sort((a, b) => {
        return a.erscheinungsjahr > b.erscheinungsjahr
          ? -1
          : a.erscheinungsjahr < b.erscheinungsjahr
          ? 1
          : 0
      })
      return resourcesSorted
    default:
      resourcesSorted = resources
      return resourcesSorted
  }
}

export { sortResources }
