import test from 'ava'
import fetch from 'node-fetch'
import { BasicApiValidation } from './fixtures/basic-api-validation'

let api: BasicApiValidation
let url: string
test.before(async () => {

  api = new BasicApiValidation()

  api.$registerValidationPlugin('myPasswordVal', {
    main: function(value: string) {
      return !(value.indexOf('123') > -1)
    }
  })

  url = await api.$start()

})

test.after(() => {
  api.$stop()
})

function doLogin(detail: any) {
  return fetch(`${url}/login`, {
    method: 'POST',
    body: JSON.stringify(detail),
    headers: { 'Content-Type': 'application/json' }
  })
}

test(`Test the $registerValidationPlugin method with positive result`, async t => {
  t.plan(1)
  const d = {username: 'John', password: 'sfdjdljkj'}
  return doLogin(d)
          .then((res: any) => res.json())
          .then((json:any) => {
            console.log(json)
            t.truthy(json)
          })
})

test.todo(`Test the $registerValidationPlugin method with negative result`)
