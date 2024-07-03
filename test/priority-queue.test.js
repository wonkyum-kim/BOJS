import { PriorityQueue } from '../lib/index.js'

describe('priority-queue', () => {
  it('push and pop', () => {
    const pq = new PriorityQueue()
    pq.push(10)
    pq.push(-10)
    pq.push(0)
    expect(pq.top()).toBe(10)
    pq.pop()
    expect(pq.top()).toBe(0)
    pq.pop()
    expect(pq.top()).toBe(-10)
    expect(pq.empty()).toBe(false)
    pq.pop()
    expect(pq.empty()).toBe(true)
  })
})
