## BOJS

`BOJS`는 자바스크립트로 백준을 쉽게 풀 수 있도록 도와줍니다.

- 쉬운 입력 방법
- 다양한 자료구조와 라이브러리 지원

## 어떻게 사용하나요?

먼저 의존성 패키지를 설치합니다.

```shell
npm i
```

풀고 싶은 문제 번호를 함께 전달하여 예제 입출력을 가져옵니다.

```shell
# 1009번의 예제를 가져온다.
npm run sample 1009
```

더 많은 테스트 케이스를 추가하고 싶다면 직접 `test-case.js`에 입력 값을 `rawInput` 배열에, 출력 값을 `rawOutput` 배열에 백틱으로 감싼 문자열로 전달합니다.

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
    if (a % 10 === 0) {
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

`input.get`은 공백 문자와 줄바꿈을 기준으로 문자열을 하나씩 가져옵니다.

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

결과물을 직접 복사해도 되지만 명령어를 입력하여 빌드한 결과물을 클립보드에 복사할 수 있습니다.

```shell
# windows
npm run copy:win

# mac
npm run copy:mac

# linux
sudo apt-get install xclip # xclip 설치 필요
npm run copy
```

새로운 문제를 풀기 위해 `index.js`와 `test-case.js`의 내용을 지우고 싶다면 아래 명령어를 입력합니다.

```shell
npm run clear
```

## 어떻게 작동하는 건가요?

`input`에 `Proxy` 객체를 사용해서 `get`이나 `getNumber` 프로퍼티에 접근하면 가로채서 입력 값을 반환합니다.

`rollup`을 사용해서 모든 코드를 하나로 번들링하여 빌드합니다.

## 주의 사항

Node.js v16.13.1 보다 높아야합니다.

리눅스에서 실행하려면 [백준 채점 서버](https://help.acmicpc.net/language/info)와 구분해야 하기 때문입니다.

Windows powershell에서 `npm run copy:win`으로 코드 복사 시 한글이 깨지는 문제가 발생하면 해당 [블로그](https://worldclassproduct.tistory.com/entry/%EC%9C%88%EB%8F%84%EC%9A%B0-%ED%8C%8C%EC%9B%8C%EC%89%98-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%80%EB%8A%94-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-2%EA%B0%80%EC%A7%80)를 보고 설정을 업데이트 하세요

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

### array2d

2차원 배열을 선언합니다.

```js
import { array2d } from './lib/index.js

// 3행 4열, 초기 값을 0으로 설정
const arr = array2d(3, 4, 0)
```

### popCount

정수 비트에서 1의 개수를 반환합니다.

```js
import { popCount } from './lib/index.js'

console.log(popCount(7)) // 3
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

const q = new Queue()

q.push(10)
q.push(-10)
q.push(0)

console.log(q.front()) // 10
q.pop()
console.log(q.front()) // -10
q.pop()
console.log(q.front()) // 0
```

## Tips

출력 시간을 줄이기 위해서 정답은 한 번에 출력하도록 합니다.

```js
function solve() {
  const ans = []

  for (let i = 0; i < 3; ++i) {
    const result = doSomething()
    ans.push(result)
  }

  console.log(ans.join(' '))
}
```

map을 사용하면 코드를 더 짧게 작성할 수 있습니다.

```js
// n, m 입력 받기
const [n, m] = [0, 0].map(() => input.getNumber)

// 길이가 n인 배열 입력 받기
const arr = new Array(n).fill(0).map(() => input.getNumber)
```

BigInt는 문자열로 입력 받은 다음 변환합니다.

```js
const big = BigInt(input.get)
```

EOF가 들어올 때까지 입력을 받아야하는 경우에는 try ... catch를 사용합니다.

```js
while (true) {
  try {
    const x = input.getNumber
    doSomething()
  } catch {
    break
  }
}
```

스페셜 저지 문제의 예제를 `npm run sample problemNumber`를 사용해 불러온 경우 build 과정에서 에러가 발생할 수 있습니다.

`test-case.js`에서 `rawOutput`을 비우고 build 하세요.

```js
// test-case.js

export const rawInput = ['...']

export const rawOutput = [] // empty
```

`npm run build`의 기본 테스트 시간은 10s 입니다.

필요에 따라서 시간을 조절할 수 있습니다.

```js
// test/output.test.js
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
```
