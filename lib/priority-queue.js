export class PriorityQueue {
  constructor() {
    this.heap = []
  }

  parent(i) {
    return Math.floor((i - 1) / 2)
  }

  left(i) {
    return 2 * i + 1
  }

  right(i) {
    return 2 * (i + 1)
  }

  swap(a, b) {
    let val = this.heap[a]
    this.heap[a] = this.heap[b]
    this.heap[b] = val
  }

  #smallerThan(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
      const isArray = a.length !== undefined && b.length !== undefined
      const hasSameLength = a.length === b.length
      if (!isArray || !hasSameLength) throw new Error('invalid array')
      for (let i = 0; i < a.length; ++i) {
        if (a[i] === b[i]) continue
        return a[i] < b[i]
      }
      return false
    }
    return a < b
  }

  push(item) {
    this.heap.push(item)
    let curr = this.heap.length - 1
    let parent = this.parent(curr)

    while (curr > 0 && this.#smallerThan(this.heap[parent], this.heap[curr])) {
      this.swap(parent, curr)
      curr = parent
      parent = this.parent(curr)
    }
  }

  top() {
    if (this.empty()) throw new Error('empty')
    return this.heap[0]
  }

  pop() {
    if (this.empty()) throw new Error('empty')
    this.heap[0] = this.heap[this.size() - 1]
    this.heap.pop()
    let curr = 0

    while (this.heap[this.left(curr)] != undefined) {
      let largest = this.left(curr)
      if (this.#smallerThan(this.heap[largest], this.heap[this.right(curr)]))
        largest = this.right(curr)
      if (this.#smallerThan(this.heap[curr], this.heap[largest])) this.swap(curr, largest)
      curr = largest
    }
  }

  empty() {
    return this.heap.length === 0
  }

  size() {
    return this.heap.length
  }
}
