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

  maxHeapify(i) {
    let l = this.left(i)
    let r = this.right(i)
    let largest = i

    if (l <= this.heap.length - 1 && this.heap[l] > this.heap[i]) largest = l
    if (r <= this.heap.length - 1 && this.heap[r] > this.heap[largest]) largest = r
    if (largest !== i) {
      ;[this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]]
      this.maxHeapify(largest)
    }
  }

  push(item) {
    this.heap.push(item)
  }

  top() {
    if (this.empty()) throw new Error('empty')
    this.maxHeapify(0)
    return this.heap[0]
  }

  pop() {
    if (this.empty()) throw new Error('empty')
    this.heap.shift()
  }

  empty() {
    return this.heap.length === 0
  }

  size() {
    return this.heap.length
  }
}
