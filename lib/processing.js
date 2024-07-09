import fs from 'fs'
import { rawInput } from '../test-case.js'

export function currentTestCaseNumber() {
  const argv = process.argv.slice(2)
  return argv.length === 0 ? 0 : argv[0]
}

export function local() {
  return rawInput[currentTestCaseNumber()]
}

export function server() {
  return fs.readFileSync('/dev/stdin').toString()
}
