export class PriorityQueue {
  constructor() {
    this.heap = ['dummy']
  }

  #swap(a, b) {
    let val = this.heap[a]
    this.heap[a] = this.heap[b]
    this.heap[b] = val
  }

  #smallerThan(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
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
    // sift up
    let curr = this.heap.length - 1
    let parent = curr >> 1
    while (curr > 1 && this.#smallerThan(this.heap[parent], this.heap[curr])) {
      this.#swap(parent, curr)
      curr = parent
      parent = curr >> 1
    }
  }

  top() {
    if (this.empty()) throw new Error('empty')
    return this.heap[1]
  }

  pop() {
    if (this.empty()) throw new Error('empty')
    this.heap[1] = this.heap[this.size()]
    this.heap.pop()
    // sift down
    const n = this.heap.length
    let curr = 1
    while (curr << 1 < n) {
      let largest = curr << 1
      if (this.#smallerThan(this.heap[largest], this.heap[largest + 1])) largest++
      if (this.#smallerThan(this.heap[curr], this.heap[largest])) this.#swap(curr, largest)
      curr = largest
    }
  }

  empty() {
    return this.heap.length === 1
  }

  size() {
    return this.heap.length - 1
  }
}
