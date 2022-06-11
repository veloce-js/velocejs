import test from 'ava'
// import fetch from '../src/node-f'
import { ApiWithContract } from './fixtures/api-with-contract-with-rules'
// import { readJsonSync } from 'fs-extra'
// import { join } from 'node:path'
// import { HttpClient } from '../src/http-client'
import client from './fixtures/client'

let api: ApiWithContract
let url: string
// let contract: any
// let client: HttpClient

test.before(async () => {
  api = new ApiWithContract()
  url = await api.$start()
  console.log(url)
})

test.after(() => {
  api.$stop()
})

test(`Should have a client that contains the same method as described in the contract`, async (t) => {
  // @NOTE this got to go into the doc
  t.true(typeof client['post'] === 'function')
})
