// form
import {
  UwsServer, FastApi,
  GET, ANY, POST,
  serveStatic
  
} from '../../src'
// we just the random port so just use open to open the page
import open from 'open'



class MyFormExample extends FastApi {

  @ANY('/*')
  fallbackHandler(params: ) {

  }
}
