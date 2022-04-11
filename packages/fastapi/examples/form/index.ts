// form
import {
  UwsServer,
  getHeaders,
  bodyParser
} from '@velocejs/server/src'
import {
  //UwsParsedResult,
  HttpRequest,
  HttpResponse,
} from '@velocejs/server/src/types'
import { join } from 'path'
import {
  FastApi,
  ServeStatic,
  // Post,
  Raw,
  //  Prepare,
  Rest
} from '../../src'

// we just the random port so just use open to open the page

import open from 'open'

@Rest()
class MyFormExample extends FastApi {

  @Raw('post', '/submit')
  async submitHandler(res: HttpResponse, req: HttpRequest): void {

    const result = await bodyParser(res, req)

    // const result = getHeaders(req)

    console.log('result', result)

    res.end('got it see console')
  }

  @ServeStatic('/*')
  get staticHandler(): string {
    return join(__dirname, 'httpdocs')
  }

}

const app = new UwsServer()
const api = new MyFormExample(app)
// wrap this up on the onStart callback
app.onStart = (url: string): void => {
  console.log('server start!', url)
  open(url)
}
// run it
api.startUp()
