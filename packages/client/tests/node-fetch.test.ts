import test from 'ava'
// import fetch from '../src/node-f'
import { ApiWithContract } from './fixtures/api-with-contract-with-rules'
import ValidationError from '@jsonql/errors/dist/validation-error'
// import { readJsonSync } from 'fs-extra'
// import { join } from 'node:path'
import { HttpClient } from '../src/http-client'
import getClient from './fixtures/client'

let api: ApiWithContract
let url: string
// let contract: any
let client: HttpClient

test.before(async () => {
  api = new ApiWithContract()
  url = await api.$start()
  console.log(url)
  client = getClient(url)
})

test.after(() => {
  api.$stop()
})

test(`Should have a client that contains the same method as described in the contract`, async (t) => {
  // @NOTE this got to go into the doc
  t.true(typeof client['post'] === 'function')
})

test(`The dynamic generate method should able to perform validation`, async (t) => {

  return client['post']('String title', 1001)
                      .catch((error: ValidationError) => {
                        console.log(error.message)
                        console.log(error.detail)
                        t.pass()
                      })

})
