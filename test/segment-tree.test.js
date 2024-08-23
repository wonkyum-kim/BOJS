import { SegmentTree } from '../lib/index.js'

describe('segment-tree', () => {
  it('sum', () => {
    const seg = new SegmentTree('sum', [5, 8, 6, 3, 2, 7, 2, 6])
    expect(seg.tree).toEqual([0, 39, 22, 17, 13, 9, 9, 8, 5, 8, 6, 3, 2, 7, 2, 6])
    expect(seg.sum(0, 3)).toBe(22)
  })

  it('max', () => {
    const seg = new SegmentTree('max', [5, 8, 6, 3, 2, 7, 2, 6])
    expect(seg.tree).toEqual([0, 8, 8, 7, 8, 6, 7, 6, 5, 8, 6, 3, 2, 7, 2, 6])
    expect(seg.max(0, 3)).toBe(8)
  })

  it('min', () => {
    const seg = new SegmentTree('min', [5, 8, 6, 3, 2, 7, 2, 6])
    expect(seg.tree).toEqual([0, 2, 3, 2, 5, 3, 2, 2, 5, 8, 6, 3, 2, 7, 2, 6])
    expect(seg.min(0, 3)).toBe(3)
  })

  it('bigInt sum', () => {
    const seg = new SegmentTree(
      'sum',
      [5, 8, 6, 3, 2, 7, 2, 6].map((item) => BigInt(item))
    )
    expect(seg.tree).toEqual(
      new BigInt64Array(
        [0, 39, 22, 17, 13, 9, 9, 8, 5, 8, 6, 3, 2, 7, 2, 6].map((item) => BigInt(item))
      )
    )
    expect(seg.sum(0, 3)).toBe(22n)
  })

  it('bigInt max', () => {
    const seg = new SegmentTree(
      'max',
      [5, 8, 6, 3, 2, 7, 2, 6].map((item) => BigInt(item))
    )
    expect(seg.tree).toEqual(
      new BigInt64Array(
        [0, 8, 8, 7, 8, 6, 7, 6, 5, 8, 6, 3, 2, 7, 2, 6].map((item) => BigInt(item))
      )
    )
    expect(seg.max(0, 3)).toBe(8n)
  })

  it('bigInt min', () => {
    const seg = new SegmentTree(
      'min',
      [5, 8, 6, 3, 2, 7, 2, 6].map((item) => BigInt(item))
    )

    expect(seg.tree).toEqual(
      new BigInt64Array(
        [0, 2, 3, 2, 5, 3, 2, 2, 5, 8, 6, 3, 2, 7, 2, 6].map((item) => BigInt(item))
      )
    )
    expect(seg.min(0, 3)).toBe(3n)
  })
})
