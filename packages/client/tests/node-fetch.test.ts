import test from 'ava'
import fetch from '../src/node-f'
import { ApiWithContract } from './fixtures/api-with-contract-with-rules'

let api: ApiWithContract
let url: string
let contract: any
test.before(async () => {
  api = new ApiWithContract()
  url = await api.$start()
  const res = await fetch(url + '/veloce/contract')
  contract = await res.json()
})

test.after(() => {
  api.$stop()
})

test(`TBD the client here`, async (t) => {

  console.dir(contract, { depth: null })

  t.pass()

})
