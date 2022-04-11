// form
import {
  UwsServer,
  bodyParser
} from '@velocejs/server/src'
import {
  HttpRequest,
  HttpResponse,
} from '@velocejs/server/src/types'
import { join } from 'path'
import {
  FastApi,
  ServeStatic,
  Raw,
  Rest
} from '../../src'
import open from 'open'
@Rest
class MyFormExample extends FastApi {

  @Raw('post', '/submit')
  async submitHandler(res: HttpResponse, req: HttpRequest) {
    const result = await bodyParser(res, req)
    console.log('result', result)
    res.end('go see the result in console')
  }

  @ServeStatic('/*')
  get staticHandler(): string {
    return join(__dirname, 'httpdocs')
  }
}

const api = new MyFormExample(new UwsServer())
api.start()
  .then(url => {
    console.log(`server started on ${url}`)
    open(url)
  })
  .catch(err => {
    console.log(err)
  })
