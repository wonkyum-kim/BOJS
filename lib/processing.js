import fs from 'fs'
import { rawInput } from '../test-case.js'

export function replaceNewlinesAndSplit(input) {
  return input.replace(/\n/g, ' ').trim().split(' ')
}

export function currentTestCaseNumber() {
  const argv = process.argv.slice(2)
  return argv.length === 0 ? 0 : argv[0]
}

export function local() {
  return rawInput.map((raw) => {
    return replaceNewlinesAndSplit(raw)
  })[currentTestCaseNumber()]
}

export function server() {
  return replaceNewlinesAndSplit(fs.readFileSync('/dev/stdin').toString())
}
