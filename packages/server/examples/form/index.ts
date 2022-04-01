// form
import {
  UwsServer,
  FastApi,
  UwsParsedResult,
  POST,
  PREPARE,
  SERVE_STATIC,
} from '../../src'
import { join } from 'path'
// we just the random port so just use open to open the page
import open from 'open'

class MyFormExample extends FastApi {

  @POST('/submit')
  submitHandler(params: UwsParsedResult) {

    console.log(params.payload.toString())

    return "OK"
  }

  @SERVE_STATIC('/*')
  staticHandler(): string {
    return join(__dirname, 'httpdocs')
  }

  @PREPARE
  startUp(...args: any[]) {
    Reflect.apply(super.run, this, args)
  }

}

const app = new UwsServer()
const api = new MyFormExample(app)
// run it
api.startUp()

const port = app.getPortNum()
const url = `http://localhost:${port}`

open(url)
