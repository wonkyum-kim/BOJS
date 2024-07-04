import { local, server } from './processing.js'

export let input = process.version !== 'v16.13.1' ? local() : server()
let inputIndex = 0
const inputLength = input.length

input = new Proxy(input, {
  get: (target, prop) => {
    if (inputIndex >= inputLength) throw new Error('index error')
    if (prop === 'get') return target[inputIndex++]
    if (prop === 'getNumber') return parseInt(target[inputIndex++])
    return target[prop]
  },
})
