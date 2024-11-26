import { Node } from './node.js'

export class Queue {
  constructor() {
    this.size = 0
    this.head = null
    this.tail = null
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
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.size++
  }

  pop() {
    if (this.empty()) throw new Error('empty')

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      const newHead = this.head.next
      this.head.next.prev = null
      this.head.next = null
      this.head = newHead
    }
    this.size--
  }
}
