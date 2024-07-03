## BOJS

`BOJS`는 자바스크립트로 백준을 쉽게 풀 수 있도록 도와줍니다.

- 쉬운 입력 방법
- 다양한 자료구조와 라이브러리 지원(예정)

## 어떻게 사용하나요?

먼저 의존성 패키지를 설치합니다.

```shell
npm i
```

`test-case.js`에 입력 값을 `rawInput` 배열에 백틱으로 감싼 문자열로 전달합니다.

(선택 사항) 출력 값을 `rawOutput` 배열에 백틱으로 감싼 문자열로 전달합니다.

```js
export const rawInput = [
  `5
1 6
3 7
6 2
7 100
9 635`,
  // 이어서 계속 추가할 수 있습니다...
]

export const rawOutput = [
  `1
7
6
1
9`,
  // 이어서 계속 추가할 수 있습니다...
]
```

그리고 `index.js`에서 코드를 작성합니다.

```js
// 백준 1009번
import { input } from './lib/index.js'

function solve() {
  let t = input.getNumber
  while (t--) {
    const a = input.getNumber
    const b = input.getNumber
    if (a % 10 == 0) {
      console.log(10)
      continue
    }
    let ans = a
    for (let i = 0; i < b - 1; ++i) {
      ans = (a * ans) % 10
    }
    console.log(ans % 10)
  }
}

solve()
```

`input.get`은 공백 문자를 기준으로 문자열을 하나씩 가져옵니다.

`input.getNumber`는 `input.get`과 같지만 문자열을 숫자로 변환하여 가져옵니다.

코드를 실행하려면 테스트 케이스 번호를 함께 전달합니다.

```shell
# 0번째 테스트 케이스를 넣고 실행
node index.js 0

# 1번째 테스트 케이스를 넣고 실행
node index.js 1
```

코드를 제출하려면 완성된 코드를 빌드합니다.

```shell
npm run build
```

`dist/index.js`에 빌드된 결과물이 출력됩니다.

만약 `rawOutput`에 출력 값을 넣었다면, 실행 값과 비교하는 과정도 진행됩니다.

```js
'use strict'

var fs = require('fs')

const rawInput = [
  `5
1 6
3 7
6 2
7 100
9 635`,
]

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

let input = process.platform !== 'linux' ? local() : server()
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

function solve() {
  let t = input.getNumber
  while (t--) {
    const a = input.getNumber
    const b = input.getNumber
    if (a % 10 == 0) {
      console.log(10)
      continue
    }
    let ans = a
    for (let i = 0; i < b - 1; ++i) {
      ans = (a * ans) % 10
    }
    console.log(ans % 10)
  }
}

solve()
```

직접 복사해도 되지만 명령어를 입력하여 빌드한 결과물을 클립보드에 복사할 수 있습니다.

```shell
# windows
npm run copy:win

# mac
npm run copy:mac
```

## 어떻게 작동하는 건가요?

`input`에 `Proxy` 객체를 사용해서 `get`이나 `getNumber` 프로퍼티에 접근하면 가로채서 입력 값을 반환합니다.

`rollup`을 사용해서 모든 코드를 하나로 번들링하여 빌드합니다.

## 지원 대상

- Windows
- Mac

## 라이브러리

### input

주어진 문자열을 공백과 줄바꿈을 기준으로 파싱하여 하나씩 반환합니다.

```js
// test-case.js
export const rawInput = [`hi 3 10`]

// index.js
import { input } from './lib/index.js'

const a = input.get
console.log(typeof a, a) // string 'hi'

const b = input.getNumber
console.log(typeof b, b) // number 3

const c = input.get
console.log(typeof c, c) // string '10'
```

### assert

조건을 만족하지 않으면 에러가 발생합니다.

```js
import { assert } from './lib/index.js'

// OK
assert(typeof 3 === 'number', '타입 에러')

// Error
assert(typeof 3 === 'string', '타입 에러')
```

### PriorityQueue

기본적인 사용 방법은 C++와 같습니다.

```js
import { PriorityQueue } from './lib/index.js'

const pq = new PriorityQueue()

pq.push(10)
pq.push(-10)
pq.push(0)

console.log(pq.top() === 10) // true
pq.pop()
console.log(pq.top() === 0) // true
pq.pop()
pq.pop()
console.log(pq.empty()) // true
```

최소 우선순위 큐가 필요하면 음수 값을 넣어서 사용하세요.

### Deque

기본적인 사용 방법은 C++와 같습니다.

```js
import { Deque } from './lib/index.js'

const dq = new Deque()

dq.pushFront(10)
dq.pushFront(-10)
dq.pushBack(0)

console.log(dq.front()) // -10
dq.popFront()
console.log(dq.back()) // 0
dq.popBack()
console.log(dq.back()) // 10
```

### Queue

기본적인 사용 방법은 C++와 같습니다.

```js
import { Queue } from './lib/index.js'

const q = new Deque()

q.push(10)
q.push(-10)
q.push(0)

console.log(q.front()) // 0
q.pop()
console.log(q.front()) // -10
q.pop()
console.log(q.front()) // 10
```

## TODO

- [x] test case 출력 값 비교
- [ ] Linux 지원
- [ ] TypeScript로 전환
- [ ] GitHub Actions 적용
- [ ] 한 줄씩 입력 받는 방법 추가
- [x] 기본 자료구조 추가
  - [x] Queue
  - [x] ~~Stack~~ Array로 대체 가능
  - [x] Deque
  - [x] PriorityQueue
- [x] 기타 라이브러리 추가
  - [x] assert
