import test from 'ava'
import fetch from 'node-fetch'
import { BasicApi } from './fixtures/basic-api'

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


test(`The most basic get test`, async t => {

  const res = await fetch(`${url}/first?x=y`)
  const txt = await res.text()
  // console.log(txt)
  // t.pass()
  t.is(txt, 'FIRST')
})
