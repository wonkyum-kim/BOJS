import { Queue } from '../lib/index.js'

describe('queue', () => {
  it('push and pop', () => {
    const q = new Queue()

    q.push(5)
    q.push(3)
    q.push(10)

    expect(q.front()).toBe(10)
    q.pop()
    expect(q.front()).toBe(3)
    q.pop()
    expect(q.front()).toBe(5)
    q.pop()
    expect(q.empty()).toBe(true)
    expect(() => q.front()).toThrow(new Error('empty'))
    expect(() => q.pop()).toThrow(new Error('empty'))
  })
})
