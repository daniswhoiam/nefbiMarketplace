//https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export { removeItem }