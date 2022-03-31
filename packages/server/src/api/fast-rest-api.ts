// this will allow you to create a series of REST API in no time
import "reflect-metadata"
import { UwsRouteHandler } from '../base/interfaces'
// The key to id the meta info
const routeKey = Symbol("FastApiRouteKey")

// Factory method to create factory method
function routeDecoratorFactory(routeType: string): any {

  return function(path: string) {

    return (target: any, propertyName: string) => {
      // all it does it to record all this meta info and we can re-use it later
      const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || []
      const payload = { propertyName, path, type: routeType }
      existingRoutes.push(payload)
      Reflect.defineMetadata(routeKey, existingRoutes, target)
    }
  }
}


export const ANY = routeDecoratorFactory('any')
export const GET = routeDecoratorFactory('get')
export const POST = routeDecoratorFactory('post')
export const PUT = routeDecoratorFactory('put')
export const OPTIONS = routeDecoratorFactory('options')
export const DEL = routeDecoratorFactory('del')
export const PATCH = routeDecoratorFactory('patch')
export const HEAD = routeDecoratorFactory('head')
// TBC what these two for
// export const CONNECT = routeDecoratorFactory('connect')
// export const TRACE = routeDecoratorFactory('trace')

function EXTRACT(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  const fn = descriptor.value
  descriptor.value = function(...args: any[]) {
    const meta = Reflect.getOwnMetadata(routeKey, target, -1)
    return fn.apply(this, [meta])
  }
}




export class FastRestApi {
  // this will store all the routes with path: string --> handler: (res, req) => void interface
  private routes: Array<UwsRouteHandler>

  public set add(route: UwsRouteHandler) {
    console.log(route)
    this.routes.push(route)
  }

  // it looks like unnecessary but we might want to do something with
  // the array so we do it like this here
  public expose(): /*Array<UwsRouteHandler>*/ void {
    console.log(this.routes)
    for (const name in this.routes) {
      console.log(name)
    }
  }

}
