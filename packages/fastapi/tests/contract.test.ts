// testing the contract generator
import test from 'ava'
import { chainPromises } from '@jsonql/utils'

/*
test.before(() => {

})

test.after(() => {

})
*/

test(`Try the chainPromises without any param`, async t => {
  t.plan(1)
  const promise1 = Promise.resolve(1)
  const promise2 = Promise.reject(2)
  const promise3 = Promise.resolve(3)

  return chainPromises([promise1, promise2, promise3])
    .then(result => {
      t.deepEqual(result, [1,2,3])
    })
    .catch(error => {
      t.is(error, 2)
    })
})

test.todo(`Testing the contract generator`)
