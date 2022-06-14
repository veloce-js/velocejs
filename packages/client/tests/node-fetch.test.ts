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
  return client.comm('news')
              .then(() => {
                t.pass()
              })
              .catch((err: ValidationError) => {
                console.log(err)
                t.pass()
              })
})

test('Test the POST method with validation', async t => {
  return client['post']('today headline', 'na na na', 2000)
                  .then((result: ClientResult) => {
                    // console.log('--->', result)
                    t.truthy(result.data)
                  })
})

test.only('Test GET url with query params', async t => {

  return client.comm('someUrl', ['2022-05-01', '2022-06-01'])
               .then((result: ClientResult) => {
                 console.log('someUrl', result)
                 t.truthy(result.data)
               })
               .catch((error: ValidationError) => {
                 console.log('error?', error)
                 t.pass()
               })
})

test.todo('Test GET with dynamic url with a spread argument api')
