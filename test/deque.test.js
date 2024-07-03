import { Deque } from '../lib/index.js'

describe('priority-queue', () => {
  it('push and pop', () => {
    const dq = new Deque()

    dq.pushFront(10)
    dq.pushFront(-10)
    dq.pushBack(0)
    // -10 10 0

    expect(dq.front()).toBe(-10)
    dq.popFront()
    expect(dq.back()).toBe(0)
    dq.popBack()
    expect(dq.front()).toBe(10)
    expect(dq.back()).toBe(10)
    expect(dq.empty()).toBe(false)
    dq.popFront()
    expect(dq.empty()).toBe(true)
    dq.pushBack(7)
    expect(dq.front()).toBe(7)
  })
})
