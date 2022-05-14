import test from 'ava'
import { RenderTest } from './fixtures/render-test'
import Fetch from 'node-fetch'

let url: string
let api: RenderTest

test.before(async () => {
  api = new RenderTest()
  url = await api.start()
})

test.after(() => {
  api.stop()
})

test(`Testing the render text render with $text`, async t => {
  const res = await Fetch(`${url}/stuff/text`)
  const text = await res.text()
  t.truthy(text)
})

test('Test the get markdown content with $text', async t => {
  const res = await Fetch(`${url}/stuff/markdown`)
  // const text = await res.text()
  t.is(res.headers.get('content-type'), 'text/markdown')
})

test(`Test the $html content`, async t => {
  const res = await Fetch(`${url}/stuff/html`)
  t.is(res.headers.get('content-type'), 'text/html')
})

test(`Test the new $json method`, async t => {
  const res = await Fetch(`${url}/posts-test`, {
    method: 'post',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      year: 2022,
      month: 5,
      day: 14
    })
  })

  const json = await res.json()
  t.deepEqual(json, {date: '2022-5-14', slug: 'NOTHING'})

})
