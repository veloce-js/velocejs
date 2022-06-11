import test from 'ava'
import fetch from '../src/node-f'
import { ApiWithContract } from './fixtures/api-with-contract-with-rules'
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { HttpClient } from '../src/http-client'


let api: ApiWithContract
let url: string
let contract: any
let client: HttpClient
test.before(async () => {
  api = new ApiWithContract()
  url = await api.$start()
  console.log(url)
  // const res = await fetch(url + '/veloce/contract')
  // contract = await res.json()
  try {
    contract = readJsonSync(join(__dirname, 'fixtures', 'contract', 'public-contract.json'))
    console.log(contract)
  } catch(e) {
    console.error(e)
  }
  client = new HttpClient(contract)
})

test.after(() => {
  api.$stop()
})

test(`TBD the client here`, async (t) => {

  console.dir(client, { depth: null })

  t.pass()
})
