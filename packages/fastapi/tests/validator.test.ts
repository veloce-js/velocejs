// Testing the validator
import test from 'ava'
import { extractArgs } from '../src/server/lib/extract'
// import { createDescriptor, createValidator } from '../src/server/lib/validator'
import Schema from 'async-validator'
/*
test.before(() => {

})

test.after(() => {


})
*/

test.only(`Transform validation input to a schema`, t => {
  t.plan(1)
  const descriptor = {
    name: {
      type: 'string',
      required: true,
      message: '%s must be string'
    },
    userId: [
      {
        type: 'integer'
      },
      {
        validator(rule, value, callback, source, options) {
          console.log('rule', rule)
          console.log('value', value)
          console.log('callback', callback)
          console.log('source', source)
          console.log('options', options)
          return []
        }
      }
    ]
  }
  const validator = new Schema(descriptor)

  return validator.validate({name: 'John Doe', userId: 100})
    .then(() => {
      t.pass()
    })
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
