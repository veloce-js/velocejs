// testing the decorator

// import { GET, FastRestApi } from './api/fast-rest-api'

// const app = new FastRestApi()

import "reflect-metadata"

const routeKey = Symbol("routeKey")

function GET(path: string) {

  return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {

    const existingRoutes = Reflect.getOwnMetadata(routeKey, target, -1) || []
    // const fn = descriptor.value
    const payload = { propertyName, path, type: 'GET' }

    existingRoutes.push(payload)

    Reflect.defineMetadata(routeKey, existingRoutes, target, -1)
  }
}


function EXTRACT(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  const fn = descriptor.value
  descriptor.value = function(...args: any[]) {
    const meta = Reflect.getOwnMetadata(routeKey, target, -1)
    return fn.apply(this, [meta])
  }
}


class MyApi {

  // constructor(private api: FastRestApi) {}

  @GET('/some-where')
  myFunc() {
    console.log(`doing the route handling thing`)
  }


  @GET('/some-where-else')
  myOtherFunc() {
    console.log(`this is the other func for other route`)
  }

  @EXTRACT
  expose(list?: any[]) {
    console.log(`Call me and hopefully got something`, list)
    const self = this
    list.forEach(meta => {
      Reflect.apply(self[meta.propertyName], self, [])
    })
  }
}


const api = new MyApi()

api.expose()
