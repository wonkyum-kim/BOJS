import { popCount } from '../lib/index.js'

describe('pop-count', () => {
  it('count', () => {
    expect(popCount(7)).toBe(3)
    expect(popCount(6)).toBe(2)
  })
})
