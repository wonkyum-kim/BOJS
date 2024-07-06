import fs from 'fs'

fs.writeFileSync(
  'index.js',
  `import { input } from './lib/index.js'

function solve() {}

solve()
`
)

fs.writeFileSync(
  'test-case.js',
  `export const rawInput = []

export const rawOutput = []`
)

console.log('clear!')
