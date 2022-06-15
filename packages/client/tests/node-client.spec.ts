// using vitest
import { test, beforeAll, afterAll } from 'vitest'

import { ClientResult, ValidationError } from '../src/types'
import { ApiWithContract } from './fixtures/api-with-contract-with-rules'
// import { readJsonSync } from 'fs-extra'
// import { join } from 'node:path'
import { HttpClient } from '../src/http-client'
import getClient from './fixtures/client'

let api: ApiWithContract
let url: string
// let contract: any
let client: HttpClient

beforeAll(async () => {
  api = new ApiWithContract()
  url = await api.$start()
  console.log(url)
  client = getClient(url)
})

afterAll(() => {
  api.$stop()
})

test('Test the basic GET method', async t => {

  const result = await client.comm('news')

  console.log(result)
  

})
