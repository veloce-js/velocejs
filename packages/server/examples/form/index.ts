// form
import {
  UwsServer,
  FastApi,
  POST,
  RAW,
  PREPARE,
  SERVE_STATIC,
  getHeaders,
} from '../../src'
import {
  //UwsParsedResult,
  HttpRequest,
  HttpResponse,
} from '../../src/types'
import { join } from 'path'
import busboy from 'busboy'
// we just the random port so just use open to open the page
import open from 'open'

class MyFormExample extends FastApi {

  @RAW('post', '/submit')
  submitHandler(res: HttpResponse, req: HttpRequest): void {
    // exactly how does it listen to the event?
    const bb = busboy({ headers:  getHeaders(req)})
    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info
      console.log(
        `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
        filename,
        encoding,
        mimeType
      )
      file.on('data', (data) => {
        console.log(`File [${name}] got ${data.length} bytes`)
      }).on('close', () => {
        console.log(`File [${name}] done`)
      })
    })

    bb.on('field', (name, val, info) => {
      console.log(`Field [${name}]: value: %j`, val)
    })

    bb.on('close', () => {
      console.log('Done parsing form!');
      // res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end()
    })
    // return "OK"
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
