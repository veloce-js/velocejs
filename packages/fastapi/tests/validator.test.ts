// Testing the validator
import test from 'ava'
import { extractArgs } from '../src/server/lib/extract'
import { createDescriptor, createValidator } from '../src/server/lib/validator'
/*
test.before(() => {

})

test.after(() => {


})
*/

test(`Transform validation input to a schema`, t => {
  


})


test.todo(`Should able to validate the incoming data`)



// even we use this just to keep it here for nyc to do report
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
