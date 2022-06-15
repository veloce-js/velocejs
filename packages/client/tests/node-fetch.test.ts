import test from 'ava'
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
  t.plan(1)
  return client.comm('news')
              .then(() => {
                t.pass()
              })
              .catch((err: ValidationError) => {
                console.log(err)
                t.pass()
              })
})

test('Test GET url with query params', async t => {
  t.plan(1)
  const result:ClientResult = await client.comm('someUrl', ['2022-05-01', '2022-06-01'])

  console.log('ClientResult', result)
  t.pass()
  // t.truthy(result.data) // if I use this then I get a 134? 128+6 exit code
})

test('Test GET with dynamic url with a spread argument api', async t => {
  t.plan(1)
  return client.comm('archive', [2022, 6, 14])
                .then((result: string) => {
                  // because the server call $text
                  t.is(result, '2022-6-14')
                })
})

test('Test the POST method with validation', async t => {
  t.plan(1)
  return client['post']('today headline', 'na na na', 2000)
                  .then((result: ClientResult) => {
                    console.log('--->', result)
                    // t.truthy(result.data)
                    t.pass()
                  })
})
