import { Node } from './node.js'

export class Deque {
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

  back() {
    if (this.empty()) throw new Error('empty')
    return this.tail.value
  }

  pushFront(value) {
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

  pushBack(value) {
    const node = new Node(value)
    if (this.empty()) {
      this.head = node
      this.tail = node
    } else {
      const second = this.tail
      second.next = node
      node.prev = second
      this.tail = node
    }
    this.size++
  }

  popFront() {
    if (this.empty()) throw new Error()
    const v = this.head.value

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
      this.head.prev = null
    }
    this.size--
    return v
  }

  popBack() {
    if (this.empty()) throw new Error()
    const v = this.tail.value

    if (this.size === 1) {
      this.head = null
      this.tail = null
    } else {
      this.tail = this.tail.prev
      this.tail.next = null
    }
    this.size--
    return v
  }
}
