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
  Prepare,
} from '../../src'

// we just the random port so just use open to open the page
import open from 'open'

class MyFormExample extends FastApi {

  @Raw('post', '/submit')
  async submitHandler(res: HttpResponse, req: HttpRequest): void {

    const result = await bodyParser(res, req)

    // const result = getHeaders(req)

    console.log('result', result)

    res.end('got it see console')
  }

  @ServeStatic('/*')
  staticHandler(): string {
    return join(__dirname, 'httpdocs')
  }

  @Prepare
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
