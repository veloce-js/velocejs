// Testing the validator
import test from 'ava'
import { extractArgs } from '../src/server/lib/extract'
import {
  completeRule,
  listRule,
  simpleRule,
} from './fixtures/rules'
import { createDescriptor, createValidator } from '../src/server/lib/schema'
import Schema from 'async-validator'




/*
test.before(() => {

})

test.after(() => {


})
*/

test.skip(`Transform validation input to a schema`, t => {
  const argListWtf = [
    { name: 'name', required: true, types: { type: 'string' } },
    { name: 'id', required: false, types: { type: 'number' } }
  ]
  const simpleCompleteRule = {
    name: { rules: [ { max: 20 } ] },
    id: { rules: [ { max: 20 } ] }
  }

  console.dir(simpleCompleteRule)

  t.plan(1)
  const validator = createValidator(argListWtf, simpleCompleteRule)
  validator({name: 'John Doe', id: 1000})
    .then(result => {
      console.log(result)
      t.pass()
    })
})


test.only(`Run a simple validation to understand the callback parameters`, t => {
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
          // console.log('callback', callback)
          console.log('source', source)
          // console.log('options', options)
          return []
        }
      }
    ]
  }
  const validator = new Schema(descriptor)

  return validator.validate({name: 'John Doe', userId: 100})
    .then(({ errors, fields }) => {
      console.log(errors)
      console.log(fields)
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
