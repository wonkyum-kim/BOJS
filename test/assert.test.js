import { assert } from '../lib/index.js'

describe('assert', () => {
  it('3 is a number', () => {
    expect(() => assert(typeof 3 === 'number', '타입 에러')).not.toThrowError()
  })

  it('3 is not a string', () => {
    expect(() => assert(typeof 3 === 'string', '타입 에러')).toThrowError(new Error('타입 에러'))
  })
})
