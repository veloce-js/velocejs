// test server to send back whatever you send it, with a timestamp
import {
  createApp,
  bodyParser
} from '../../dist'
import { HttpResponse, HttpRequest } from '../../'

export const app = createApp()
                    .any('/*', async (res: HttpResponse, req: HttpRequest) => {

                      const result = await bodyParser(res, req)

                      // we only return the result.params



                    })
