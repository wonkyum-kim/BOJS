import { lowerBound } from '../lib/index.js'

describe('lower-bound', () => {
  it('find', () => {
    const arr = [1, 2, 2, 3, 3, 5, 6]

    expect(lowerBound(arr, 1)).toBe(0)
    expect(lowerBound(arr, 2)).toBe(1)
    expect(lowerBound(arr, 3)).toBe(3)
    expect(lowerBound(arr, 4)).toBe(5)
    expect(lowerBound(arr, 5)).toBe(5)
    expect(lowerBound(arr, 6)).toBe(6)
    expect(lowerBound(arr, 100)).toBe(arr.length)
  })
})
