// form
import {
  UwsServer,
  FastApi,
  POST,
  RAW,
  PREPARE,
  SERVE_STATIC,
  getHeaders,
  getBoundary,
  bodyParser
} from '../../src'
import {
  //UwsParsedResult,
  HttpRequest,
  HttpResponse,
} from '../../src/types'
import { join } from 'path'

// we just the random port so just use open to open the page
import open from 'open'

class MyFormExample extends FastApi {

  @RAW('post', '/submit')
  async submitHandler(res: HttpResponse, req: HttpRequest): void {

    const result = await bodyParser(res, req)

    console.log(result)

    res.end('got it see console')
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
// wrap this up on the onStart callback
app.onStart = (url: string): void => {
  open(url)
}
// run it
api.startUp()
