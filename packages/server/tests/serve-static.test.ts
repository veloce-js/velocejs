// testing the serveStatic
import test from 'ava'
import { UwsServer, serveStatic, getRenderer, fileRender } from '../dist'
import { HttpResponse, HttpRequest } from '../dist/types'
import Fetch from 'node-fetch'
import { join } from 'path'
import { readFileSync } from 'fs-extra'

const dir = join(__dirname, 'fixtures', 'tmp')
let app, url

test.before(() => {
  app = new UwsServer()
  app.run([
    {
      type: 'get',
      path: '/markdown',
      handler: (res: HttpResponse) => {
        const writer = getRenderer(res)
        const content = readFileSync(join(dir, 'README.md'))
        writer('markdown', content)
      }
    },
    {
      type: 'get',
      path: '/jpeg/*',
      handler: (res: HttpResponse, req: HttpRequest) => {
        const url = req.getUrl().replace('/jpeg/', '')
        fileRender(res)(join(dir, url))
      }
    },
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

test(`Quick test the getRenderer method`, async t => {
  t.plan(1)
  const res = await Fetch(`${url}/markdown`)
  // console.log(res.headers)
  const md = await res.text()
  t.truthy(md)
  // console.log(md)
  // @TODO why is this return as undefined?
  // console.log(res.headers['content-type'], 'text/markdown')
})

test(`Test the fileRender method`, async t => {
  t.plan(1)
  const res = await Fetch(`${url}/jpeg/test.jpg`)

  t.is(res.headers.get('content-type'), 'image/jpeg')
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
