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
