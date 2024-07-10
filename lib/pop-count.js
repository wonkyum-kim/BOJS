/**
 *
 * @param {number} n
 * @returns number of 1
 */
export function popCount(n) {
  let count = 0
  let copy = n
  while (copy) {
    copy &= copy - 1
    count++
  }
  return count
}
