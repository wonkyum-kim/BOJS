import util from 'node:util'
import { exec as _exec } from 'node:child_process'
import { rawOutput } from '../test-case.js'

function replaceNewlinesAndSplit(input) {
  return input.replace(/\n/g, ' ').trim().split(' ')
}

// https://stackoverflow.com/questions/53268672/how-do-i-wait-for-an-exec-process-to-finish-in-jest
const exec = util.promisify(_exec)

describe('output', () => {
  it('Check all test cases', async () => {
    if (rawOutput.length === 0) return

    const parsed = rawOutput.map((raw) => {
      return replaceNewlinesAndSplit(raw)
    })

    for (let i = 0; i < parsed.length; ++i) {
      const { stdout } = await exec(`node index.js ${i}`)

      // 출력된 결과
      const received = replaceNewlinesAndSplit(stdout)
      // 정답
      const answer = parsed[i]

      received.forEach((rec, j) => {
        expect(rec).toBe(answer[j])
      })
    }
  }, 10000) // 10s
})
