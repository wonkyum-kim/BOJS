export class SegmentTree {
  /**
   *
   * @param {'sum' | 'max' | 'min'} useage
   * @param {number} n
   * @param {boolean?} bigInt
   */
  constructor(useage, n, bigInt = false) {
    this.useage = useage
    this.n = n
    this.h = 1 << Math.ceil(Math.log2(n))
    this.arr = []
    this.bigInt = bigInt
    this.tree = !bigInt ? new Array(this.h << 1).fill(0) : new BigInt64Array(this.h << 1).fill(0n)
  }

  #_update(k) {
    const left = k << 1
    const right = left + 1
    if (this.useage === 'sum') {
      this.tree[k] = this.tree[left] + this.tree[right]
    } else if (this.useage === 'max') {
      this.tree[k] = this.tree[left] > this.tree[right] ? this.tree[left] : this.tree[right]
    } else if (this.useage === 'min') {
      this.tree[k] = this.tree[left] < this.tree[right] ? this.tree[left] : this.tree[right]
    } else {
      throw new Error('invalid useage')
    }
  }

  /**
   *
   * @param {number[] | BigInt64Array} arr
   */
  init(arr) {
    this.arr = arr
    for (let i = 0; i < this.n; ++i) {
      this.tree[this.h + i] = this.arr[i]
    }

    for (let k = this.h - 1; k > 0; k--) {
      this.#_update(k)
    }
  }

  /**
   *
   * @param {number} k index
   * @param {number} x value
   */
  update(k, x) {
    this.arr[k] += x
    k += this.h
    this.tree[k] += x
    for (k >>= 1; k >= 1; k >>= 1) {
      this.#_update(k)
    }
  }

  /**
   *
   * @param {number} a start
   * @param {number} b end
   */
  sum(a, b) {
    if (this.useage !== 'sum') throw new Error('invalid useage')
    a += this.h
    b += this.h
    let ans = this.bigInt ? 0n : 0
    while (a <= b) {
      if ((a & 1) === 1) ans += this.tree[a++]
      if ((b & 1) === 0) ans += this.tree[b--]
      a = Math.floor(a / 2)
      b = Math.floor(b / 2)
    }
    return ans
  }

  /**
   *
   * @param {number} a start
   * @param {number} b end
   */
  max(a, b) {
    if (this.useage !== 'max') throw new Error('invalid useage')
    a += this.h
    b += this.h
    let ans = -Infinity
    while (a <= b) {
      if ((a & 1) === 1) {
        ans = ans > this.tree[a] ? ans : this.tree[a]
        a++
      }
      if ((b & 1) === 0) {
        ans = ans > this.tree[b] ? ans : this.tree[b]
        b--
      }
      a = Math.floor(a / 2)
      b = Math.floor(b / 2)
    }
    return ans
  }

  /**
   *
   * @param {number} a start
   * @param {number} b end
   */
  min(a, b) {
    if (this.useage !== 'min') throw new Error('invalid useage')
    a += this.h
    b += this.h
    let ans = Infinity
    while (a <= b) {
      if ((a & 1) === 1) {
        ans = ans < this.tree[a] ? ans : this.tree[a]
        a++
      }
      if ((b & 1) === 0) {
        ans = ans < this.tree[b] ? ans : this.tree[b]
        b--
      }
      a = Math.floor(a / 2)
      b = Math.floor(b / 2)
    }
    return ans
  }
}
