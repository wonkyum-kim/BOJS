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

  push(item) {
    this.heap.push(item)
    let curr = this.heap.length - 1
    let parent = this.parent(curr)

    while (curr > 0 && this.heap[parent] < this.heap[curr]) {
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
      if (this.heap[this.right(curr)] > this.heap[largest]) largest = this.right(curr)
      if (this.heap[curr] < this.heap[largest]) this.swap(curr, largest)
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
