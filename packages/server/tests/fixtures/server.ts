// test server to send back whatever you send it, with a timestamp
import {
  createApp,
  bodyParser,
  getCorkWriter
} from '../../dist'
import {
  HttpResponse,
  HttpRequest
} from '../../'
import {
  IS_JSON
} from '../../src/constants'

export const app = createApp()
                    .any('/*', async (res: HttpResponse, req: HttpRequest) => {
                      const result = await bodyParser(res, req)
                      // we only return the result.params
                      const writer = getCorkWriter(res)
                      

                    })
