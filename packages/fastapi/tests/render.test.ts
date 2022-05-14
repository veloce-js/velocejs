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

test(`Testing the render text render`, async t => {

  const res = await Fetch(`${url}/stuff/text`)
  const text = await res.text()

  console.log(text)

  t.truthy(text)

})

test('Test the get markdown content', async t => {

  const res = await Fetch(`${url}/stuff/markdown`)
  // const text = await res.text()

  t.is(res.headers.get('content-type'), 'text/markdown')
})
