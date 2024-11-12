import fs from 'fs'
import { rawInput } from '../test-case.js'

export function getParameter() {
  const argv = process.argv.slice(2)
  return argv.length === 0 ? 0 : argv[0]
}

export function local() {
  return rawInput[getParameter()]
}

export function server() {
  return fs.readFileSync(0, 'utf-8').toString()
}
