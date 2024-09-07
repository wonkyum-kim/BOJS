import { local, server } from './processing.js'

export let input = {
  raw: process.version !== 'v16.13.1' ? local() : server(),
  get: () => slice(),
  getNumber: () => +slice(),
}

let index = 0

export function slice() {
  const length = input.raw.length
  while (input.raw[index].charCodeAt() <= 32) index++
  const start = index
  while (index < length && input.raw[index].charCodeAt() > 32) index++
  return input.raw.slice(start, index)
}

input = new Proxy(input, {
  get: (target, prop) => {
    const length = input.raw.length
    if (index > length) throw new Error('index error')
    if (prop === 'get') return slice()
    if (prop === 'getNumber') return +slice()
    return target[prop]
  },
})
