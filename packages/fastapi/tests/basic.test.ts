import test from 'ava'
import fetch from 'node-fetch'
import { BasicApi } from './fixtures/basic-api'
import { DEFAULT_HEADERS } from '../src/lib/constants'
let url = ''
let api: BasicApi

test.before(async () => {
  api = new BasicApi()
  url = await api.$start()
  // console.log('basicApi started on', url)
})

test.after(() => {
  api.$stop()
})

test(`Test the catchAll route to handle 404`, async t => {
  const res = await fetch(`${url}/route-dont-exist`)

  t.is(res.status, 404)
})

test(`Test the contract api first`, async t => {

  const res = await fetch(`${url}/veloce/contract`)
  const json = await res.json()

  t.truthy(json)
})

test(`The basic get test with query params`, async t => {

  const res = await fetch(`${url}/first?x=y`)
  const txt = await res.text()
  // console.log(txt)
  // t.pass()
  t.is(txt, 'FIRST')
})

test(`The get test with query params with DEFAULT_HEADERS`, async t => {

    const res = await fetch(`${url}/first?x=y`, { headers: DEFAULT_HEADERS})
    const json = await res.json() as unknown as { data: string }

    t.is(json.data, 'FIRST')
})
