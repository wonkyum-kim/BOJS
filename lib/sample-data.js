import { JSDOM } from 'jsdom'
import { getParameter } from './processing.js'
import fs from 'fs'

async function fetchAndParseHTML(index) {
  const res = await fetch(`https://www.acmicpc.net/problem/${index}`, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
    },
  })
  const data = await res.text()

  const dom = new JSDOM(data)
  return dom.window.document
}

function wrapBacktick(str) {
  return str
    .trim()
    .split('ㅡ')
    .map((item) => `\`${item}\``)
    .join(',\n')
}

async function extractElementsFromHTML(index) {
  const document = await fetchAndParseHTML(index)
  const elements = document.querySelectorAll('.sampledata')

  if (elements.length % 2 === 1)
    throw new Error('예제 파싱에 문제가 발생하였습니다. 직접 복사해서 사용하세요.')
  const input = []
  const output = []
  for (let i = 0; i < elements.length; ++i) {
    const text = elements[i].textContent.trim()
    if (i % 2 === 0) input.push(text)
    else output.push(text)
  }

  fs.writeFileSync(
    'test-case.js',
    `export const rawInput = [${wrapBacktick(input.join('ㅡ'))}]

  export const rawOutput = [${wrapBacktick(output.join('ㅡ'))}]`
  )
}

const problemNum = getParameter()

extractElementsFromHTML(problemNum).then(() => {
  console.log(`${problemNum}번 문제의 예제가 입력되었습니다.`)
})
