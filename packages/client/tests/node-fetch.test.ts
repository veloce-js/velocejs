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

test('Test the basic GET method', async t => {
  return client.comm('news')
              .then(() => {
                t.pass()
              })
})

test.todo('Test the POST method with validation')

test.todo('Test GET url with query params')

test.todo('Test GET with dynamic url with a spread argument api')
