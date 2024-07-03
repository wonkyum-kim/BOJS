import { Node } from './node.js'

export class Queue {
  constructor() {
    this.size = 0
    this.head = null
  }

  empty() {
    return this.size === 0
  }

  front() {
    if (this.empty()) throw new Error('empty')
    return this.head.value
  }

  push(value) {
    const node = new Node(value)
    if (this.empty()) {
      this.head = node
      this.tail = node
    } else {
      const second = this.head
      second.prev = node
      node.next = second
      this.head = node
    }
    this.size++
  }

  pop() {
    if (this.empty()) throw new Error('empty')

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
      this.head.prev = null
    }
    this.size--
  }
}
