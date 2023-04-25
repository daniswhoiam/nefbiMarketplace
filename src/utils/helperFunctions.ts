import { Resource } from "./interfaces"
import _ from "lodash"

//https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

function calculateAge(ageArray: Resource["altersgruppe"]) {
  const regex = /([0-9]+)/g
  const ageArrayNumbers = ageArray.map((el: string) => {
    const match = el.match(regex)
    if (match != null) {
      return match
    } else {
      return
    }
  })
  const flattenedArray = ageArrayNumbers.flat()
  const ageNumbers = _.map(flattenedArray, function (val) {
    return _.toNumber(val)
  })

  const minAge = _.min(ageNumbers)
  const maxAge = _.max(ageNumbers)

  return `${minAge}-${maxAge} Jahre`
}

export { removeItem, calculateAge }
