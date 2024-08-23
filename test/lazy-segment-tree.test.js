import { LazySegmentTree } from '../lib/lazy-segment-tree.js'

describe('lazy-segment-tree', () => {
  it('lazy update', () => {
    const lazySeg = new LazySegmentTree([1, 2, 3, 4, 5])
    expect(lazySeg.tree).toEqual([0, 15, 10, 5, 3, 7, 5, 0, 1, 2, 3, 4, 5, 0, 0, 0])
    lazySeg.update(2, 3, 6)
    expect(lazySeg.sum(1, 4)).toBe(26)
    lazySeg.update(0, 2, -2)
    expect(lazySeg.sum(1, 4)).toBe(22)
  })

  it('bigInt lazy update', () => {
    const lazySeg = new LazySegmentTree([1, 2, 3, 4, 5].map((x) => BigInt(x)))
    expect(lazySeg.tree).toEqual(
      new BigInt64Array([0, 15, 10, 5, 3, 7, 5, 0, 1, 2, 3, 4, 5, 0, 0, 0].map((x) => BigInt(x)))
    )
    lazySeg.update(2, 3, 6n)
    expect(lazySeg.sum(1, 4)).toBe(26n)
    lazySeg.update(0, 2, -2n)
    expect(lazySeg.sum(1, 4)).toBe(22n)
  })
})
