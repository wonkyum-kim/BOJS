export function array2d(row, col, initValue = 0) {
  return Array.from({ length: row }, () => Array.from({ length: col }, () => initValue))
}
