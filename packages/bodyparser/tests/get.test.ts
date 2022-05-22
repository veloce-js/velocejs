// this problem was raise when we try to send a json header using get
import test from 'ava'
import fetch from 'node-fetch'
import app from './fixtures/server'
import { CONTENT_TYPE } from '@jsonql/constants'
let url = 'http://localhost:'

test.before(() => {
  app.start()
  url = url + app.getPortNum()
  // console.log(`server started on ${url}`)
})

test.after(() => {
  app.shutdown()
})

test(`Testing the url with dynamic parameter`, async t => {
  t.plan(1)
  // '/some-path/:id/(/:optional)'
  const res = await fetch(`${url}/some-path/100?_cb=${Date.now()}&id=200` )
  const json = await res.json()
  // console.log(json)
  t.deepEqual(json, {id: '100'})
})

test(`Should able to fix the buffer.toString() problem with a post`,async t => {
  t.plan(1)
  // + '/whatever?key=1&b=2'
  const res = await fetch(url  + '/whatever?key=1&b=2', {
    headers: {
      'Content-Type': CONTENT_TYPE
      // 'application/json'
    },
    // method: 'HEAD' // <-- this will cause a unexpected end of JSON imput, but this is todo with node-fetch
  })
  const json = await res.json()

  t.truthy(json)
})
