import { array2d } from '../lib/index.js'

describe('array2d', () => {
  it('3 rows and 4 columns', () => {
    const arr = array2d(3, 4, 0)
    expect(arr.length).toBe(3)
    expect(arr[0].length).toBe(4)
    expect(arr[1][1]).toBe(0)
  })
})
