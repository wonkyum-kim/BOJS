import fs from 'fs'

export function replaceNewlinesAndSplit(input) {
  return input
    .replace(/\n/g, ' ')
    .trim()
    .split(' ')
    .filter((str) => str.length)
}

export function currentTestCaseNumber() {
  const argv = process.argv.slice(2)
  return argv.length === 0 ? 0 : argv[0]
}

export function local(raw) {
  return raw.map((raw) => {
    return replaceNewlinesAndSplit(raw)
  })[currentTestCaseNumber()]
}

export function server() {
  return replaceNewlinesAndSplit(fs.readFileSync('/dev/stdin').toString())
}
