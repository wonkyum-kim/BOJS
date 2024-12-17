import { local, server } from './processing.js'

export let input = {
  raw: process.version !== 'v16.13.1' ? local() : server(),
  get: () => slice(),
  getNumber: () => +slice(),
}

let index = 0
const length = input.raw.length

export function slice() {
  const raw = input.raw
  while (raw[index].charCodeAt() <= 32) index++
  const start = index
  while (index < length && raw[index].charCodeAt() > 32) index++
  return raw.slice(start, index)
}

input = new Proxy(input, {
  get: (target, prop) => {
    if (prop === 'get') return slice()
    if (prop === 'getNumber') return +slice()
    return target[prop]
  },
})
