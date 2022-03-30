// testing the decorator


import { GET, FastRestApi } from '../src/api/fast-rest-api'


class MyApi {

  @GET('/some-where', FastRestApi)
  myFunc() {
    console.log(`doing the route handling thing`)
  }
}

const api = new FastRestApi()

console.log(api.expose())
