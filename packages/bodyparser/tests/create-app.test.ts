// it got stuck for no reason when using the raw createApp() in prodution
import type {
  HttpResponse,
  HttpRequest,
  us_listen_socket
} from '@velocejs/server/index'
import type {
  UwsRespondBody
} from '../src/types'
import test from 'ava'
import { createApp, getPort, shutdownServer, jsonWriter } from '@velocejs/server'
import { bodyParser } from '../src'

import fetch from 'node-fetch'

let token: us_listen_socket = ''
let url = 'http://localhost:'

test.before(async () => {
  const app = createApp()
  app.post('/whatever', async (res: HttpResponse, req: HttpRequest) => {
    res.onAborted(() => { console.log('aborted') })
    const result = await bodyParser(res, req)
    jsonWriter(res)(result)
  })

  app.listen(0, (_token: us_listen_socket)=> {
    if (_token) {
      token = _token
      url = url + getPort(token)
    }
  })
})

test.after(() => {
  shutdownServer(token)
})

test('Should able to connect to the raw app setup server', async t => {
  t.plan(2)
  const payload = { whatever: 'whatever' }
  return new Promise(resolve => {
    fetch(`${url}/whatever`, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json; chartset=utf8'}
    }).then(res => {
      t.is(res.status, 200)
      return res.json()
    }).then((json: UwsRespondBody) => {
      t.deepEqual(json.params, payload)
      resolve()
    })
  })
})
