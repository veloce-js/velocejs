// form
import {
  bodyParser
} from '../../src'
import {
  HttpRequest,
  HttpResponse,
} from '../../src/types'
import { join } from 'path'


@Rest
class MyFormExample extends FastApi {

  @Raw('post', '/submit')
  async submitHandler(res: HttpResponse, req: HttpRequest) {
    const result = await bodyParser(res, req)
    console.dir(result, { depth: null })
    res.end('go see the result in console')
  }

  @ServeStatic('/*')
  get staticHandler(): string {
    return join(__dirname, 'httpdocs')
  }
}

const api = new MyFormExample()
api.start()
  .then(url => {
    console.log(`server started on ${url}`)
    open(url)
  })
  .catch(err => {
    console.log(err)
  })
