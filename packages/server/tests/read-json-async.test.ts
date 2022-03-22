import test from 'ava'
import { createApp, readJsonAsync } from '../src/index'
import Fetch from 'node-fetch'
import { HttpResponse } from 'uWebSockets.js'

const port = 9002
const payload = {data: [1,2,3]}

test(`Testing the readJsonAsync method`, async t => {
  t.plan(1)
  createApp()
    .post('/*', async (res: HttpResponse) => {

      const result = await readJsonAsync(res)

      t.deepEqual(result, payload)

      res.writeHeader('Content-type', 'application/json')
      res.end(JSON.stringify({OK: true}))

    })
    .listen(port, token => {
      if (!token) {
        console.log(`Start up server failed on`, port)
      }
    })



    await Fetch(`http://localhost:${port}`, {
        method: 'post',
	      body: JSON.stringify(payload),
	      headers: {'Content-Type': 'application/json'}
      })


})
