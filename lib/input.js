import { rawInput } from '../test-case.js'
import { local, server } from './processing.js'

export let input = process.version !== 'v16.13.1' ? local(rawInput) : server()
let inputIndex = 0
const inputLength = input.length

input = new Proxy(input, {
  get: (target, prop) => {
    if (inputIndex >= inputLength) throw new Error('input 값이 더 이상 없습니다.')
    if (prop === 'get') return target[inputIndex++]
    if (prop === 'getNumber') return parseInt(target[inputIndex++])
    return target[prop]
  },
})
