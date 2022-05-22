import test from 'ava'
import fetch from 'node-fetch'
import server from './fixtures/two-routes'

let url = 'http://localhost:'

test.before(() => {
  server.start()
  url = url + app.getPortNum()
  console.log(`server started on ${url}`)
})

test.after(() => {
  server.shutdown()
})



test(`First test the normal get route with query params`, async t => {


})
