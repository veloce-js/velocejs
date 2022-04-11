// Testing the validator
import test from 'ava'
import { extractArgs } from '../src/server/lib/extract'
/*
test.before(() => {

})

test.after(() => {


})
*/

test(`Extract method`, t => {

  const code = `
  function someFunc(
    a,
    b,
    c
  ) {
    return a + b - c
  }
  `
  const args = extractArgs(code)

  t.deepEqual(args, ['a', 'b', 'c'])
})


test.todo(`Should able to validate the incoming data`)
