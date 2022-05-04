// testing the middlewares
import test from 'ava'
import { queuePromisesProcess } from '@jsonql/utils'

test(`first test out the processing queue engine`, async t => {

  async function a({ value }) {
    return value
  }

  async function b(value: string) {
    return [ value, 'again' ]
  }
  
  // so it won't apply the array of argument instead just passing as object
  async function c(value: string, text: string) {
    return value + ' ' + text
  }

  t.plan(1)

  return queuePromisesProcess([a, b, c], { value: 'OK' })
              .then((result: any) => {
                t.truthy(result)
                console.log(result)
              })

})
