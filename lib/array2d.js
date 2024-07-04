export function array2d(row, col, initValue = 0) {
  const arr = new Array()
  for (let i = 0; i < row; ++i) {
    arr.push(new Array(col).fill(initValue))
  }
  return arr
}
