/**
 * arr에서 target 이상이 되는 첫 인덱스를 반환
 * @param {number[]} arr
 * @param {number} target
 * @returns number
 */
export function lowerBound(arr, target) {
  let left = 0
  let right = arr.length
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] < target) left = mid + 1
    else right = mid
  }
  return right
}
