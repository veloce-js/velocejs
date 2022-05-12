// this problem was raise when we try to send a json header using get
import test from 'ava'
import fetch from 'node-fetch'
import app from './fixtures/server'

let url = 'http://localhost:'

test.before(() => {
  app.start()
  url = url + app.getPortNum()
  console.log(`server started on ${url}`)
})

test.after(() => {
  app.shutdown()
})


test(`Should able to fix the buffer.toString() problem with a post`,async t => {

  const res = await fetch(url + '/whatever?key=1&b=2', {
    headers: { 'Content-Type': 'application/json'}
  })
  const json = await res.json()

  console.log(json)

  t.truthy(json)
})
