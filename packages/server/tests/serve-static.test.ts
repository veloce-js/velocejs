// testing the serveStatic
import test from 'ava'
import { UwsServer, serveStatic } from '../src'
import Fetch from 'node-fetch'
import { join } from 'path'

const dir = join(__dirname, 'fixtures', 'tmp')
let app

test.before(() => {
  app = new UwsServer()
  app.run([
    {
      type: 'get',
      path: '/*',
      handler: serveStatic(dir)
    }
  ])
})

test.after(() => {
  app.shutdown()
})

test(`Test the serveStatic function`, async (t) => {
  t.plan(1)
  const port = app.getPortNum()
  const url = `http://localhost:${port}`
  const response = await Fetch(`${url}/README.md`)

  t.is(response.status, 200)
})
