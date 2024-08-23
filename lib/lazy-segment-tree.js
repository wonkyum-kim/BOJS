export class LazySegmentTree {
  /**
   *
   * @param {number[] | BigInt64Array} arr
   */
  constructor(arr) {
    this.h = 1 << Math.ceil(Math.log2(arr.length))
    this.bigInt = typeof arr[0] === 'bigint'
    this.tree = !this.bigInt
      ? new Array(this.h << 1).fill(0)
      : new BigInt64Array(this.h << 1).fill(0n)
    this.lazy = !this.bigInt
      ? new Array(this.h << 1).fill(0)
      : new BigInt64Array(this.h << 1).fill(0n)

    for (let i = 0; i < arr.length; ++i) this.tree[this.h + i] = arr[i]
    for (let k = this.h - 1; k > 0; k--)
      this.tree[k] = this.tree[this.#left(k)] + this.tree[this.#right(k)]
  }

  #left(x) {
    return x << 1
  }

  #right(x) {
    return (x << 1) | 1
  }

  #propagation(pos, length) {
    if (this.lazy[pos] === this.bigInt ? 0n : 0) return
    this.tree[pos] += this.lazy[pos] * (this.bigInt ? BigInt(length) : length)
    if (pos < this.h) {
      this.lazy[this.#left(pos)] += this.lazy[pos]
      this.lazy[this.#right(pos)] += this.lazy[pos]
    }
    this.lazy[pos] = this.bigInt ? 0n : 0
  }

  #propagationAll(pos) {
    for (let i = Math.log2(this.h); i >= 0; --i) {
      this.#propagation(pos >> i, 1 << i)
    }
  }

  update(start, end, x) {
    let i = (start += this.h)
    let j = (end += this.h)

    this.#propagationAll(start)
    this.#propagationAll(end)

    while (true) {
      if (i === j) {
        this.lazy[i] += x
        break
      }
      if (i & 1) {
        this.lazy[i++] += x
      } else if (~j & 1) {
        this.lazy[j--] += x
      } else {
        i >>= 1
        j >>= 1
      }
    }

    let length = 1
    for (start >>= 1, end >>= 1; start > 0; start >>= 1, end >>= 1, length <<= 1) {
      const [startLeft, endLeft] = [start, end].map((x) => this.#left(x))
      const [startRight, endRight] = [start, end].map((x) => this.#right(x))

      this.#propagation(startLeft, length)
      this.#propagation(startRight, length)
      this.tree[start] = this.tree[startLeft] + this.tree[startRight]

      this.#propagation(endLeft, length)
      this.#propagation(endRight, length)
      this.tree[end] = this.tree[endLeft] + this.tree[endRight]
    }
  }

  sum(start, end) {
    this.#propagationAll((start += this.h))
    this.#propagationAll((end += this.h))
    let ans = this.bigInt ? 0n : 0
    let length = 1
    while (start < end) {
      if (start & 1) {
        this.#propagation(start, length)
        ans += this.tree[start++]
      } else if (~end & 1) {
        this.#propagation(end, length)
        ans += this.tree[end--]
      } else {
        start >>= 1
        end >>= 1
        length <<= 1
      }
    }
    this.#propagation(start, length)

    return ans + this.tree[start]
  }
}
