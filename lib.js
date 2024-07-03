import fs from 'fs'
import { rawInput } from './test-case.js'

function replaceNewlinesAndSplit(input) {
  return input.replace(/\n/g, ' ').trim().split(' ')
}

function currentTestCaseNumber() {
  const argv = process.argv.slice(2)
  return argv.length === 0 ? 0 : argv[0]
}

function local() {
  return rawInput.map((raw) => {
    return replaceNewlinesAndSplit(raw)
  })[currentTestCaseNumber()]
}

function server() {
  return replaceNewlinesAndSplit(fs.readFileSync('/dev/stdin').toString())
}

export let input = process.platform !== 'linux' ? local() : server()

let inputIndex = 0
const inputLength = input.length

input = new Proxy(input, {
  get: (target, prop) => {
    if (inputIndex >= inputLength) throw new Error('input 값이 더 이상 없습니다.')
    if (prop === 'get') return target[inputIndex++]
    if (prop === 'getNumber') return parseInt(target[inputIndex++])
  },
})

//----------------------------------------------------------------------------
