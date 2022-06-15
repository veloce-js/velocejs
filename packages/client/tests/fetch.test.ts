import test from 'ava'
import { f } from '../src/fetch'
import Fetch from 'node-fetch'
import { DevApi } from '../dev/api'

let url: string
let api: DevApi
test.before(async () => {
  api = new DevApi()

  url = await api.$start()
  console.log('start on', url)
})

test.after(() => {
  api.$stop()
})

test(`Test to see if our fetch works or not`, async t => {
  t.plan(1)
  /*
  const json = await f(
    url + '/simple',
    'get'
  )
  */


  return Fetch(url + '/veloce/contract')
          .then(res => res.json())
          .catch(err => console.log(err))
          .then(json => {
            console.log(json)

            t.truthy(json)

          })

})
