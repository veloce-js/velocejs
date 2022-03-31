// testing the decorator

// import { GET, FastRestApi } from './api/fast-rest-api'

import { GET, FastRestApi, EXTRACT_META_INFO } from '../src/api/fast-rest-api'
import { UwsServer } from '../src/base/uws-server-class'

class MyApi extends FastRestApi {

  // constructor(private api: FastRestApi) {}

  @GET('/some-where')
  myFunc() {
    console.log(`doing the route handling thing`)
  }


  @GET('/some-where-else')
  myOtherFunc() {
    console.log(`this is the other func for other route`)
  }

  @EXTRACT_META_INFO
  anything(...args: any[]) {
    Reflect.apply(super.run, this, args)
  }
}

const app = new UwsServer()
const api = new MyApi(app)

api.anything()
