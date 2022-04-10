// testing the serveStatic
import test from 'ava'
import { UwsServer, serveStatic } from '../dist'
import Fetch from 'node-fetch'
import { join } from 'path'

const dir = join(__dirname, 'fixtures', 'tmp')
let app, url

test.before(() => {
  app = new UwsServer()
  app.run([
    {
      type: 'get',
      path: '/*',
      handler: serveStatic(dir)
    }
  ])

  url = `http://localhost:${app.getPortNum()}`
})

test.after(() => {
  app.shutdown()
})

test(`Test the serveStatic function`, async (t) => {
  t.plan(1)
  const response = await Fetch(`${url}/README.md`)
  t.is(response.status, 200)
})

test('Test if its response correct 404 for non-existing file', async t => {
  t.plan(1)
  const response1 = await Fetch(`${url}/not-here.jpg`)
  t.is(response1.status, 404)
})
