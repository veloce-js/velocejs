import test from 'ava'
import {
  UwsServer,
  jsonWriter
} from '@velocejs/server'
import {
  HttpResponse,
  HttpRequest
} from '@velocejs/server/index'
import fetch from 'node-fetch'
import { bodyParser, UrlPattern } from '../src'
import { URL_PATTERN_OBJ } from '../src'
// setup
let app: UwsServer
test.before(() => {
  app = new UwsServer()
  app.autoStart = false
})

test.after(() => {
  app.shutdown()
})

test(`Test the preconfig UrlPattern object with bodyParser`, async t => {
  t.plan(2)
  const route = '/some-path/:id(/:optional)'
  const urlPatternObj = new UrlPattern(route)
  app.run([
    {
      type: 'get',
      path: '/some-path/*', // here is the problem
      handler: async (res: HttpResponse, req: HttpRequest) => {
        const result = await bodyParser(res, req, {
          config: {
            [URL_PATTERN_OBJ]: urlPatternObj
          }
        })
        // console.log(`got called here`, result)
        const { params } = result
        t.deepEqual(params, {id: '101'})
        // we only return the result.params
        jsonWriter(res)(params)
      }
    }
  ])

  return new Promise((resolver: any) => {
    app.onStart = async function(url: string) {
      const res = await fetch(`${url}/some-path/101`)
      const json = await res.json()
      // console.log('json', json)
      t.pass()
      resolver(json)
    }

    app.start()
  })
})
