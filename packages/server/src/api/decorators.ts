// all decorators are here
import "reflect-metadata"

// The key to id the meta info
const routeKey = Symbol("FastApiRouteKey")
import { RouteMetaInfo } from './type'
import { FastApi } from './fast-api'

// Factory method to create factory method
function routeDecoratorFactory(routeType: string): any {

  return function(path: string) {

    return (target: any, propertyName: string) => {
      // all it does it to record all this meta info and we can re-use it later
      const existingRoutes = Reflect.getOwnMetadata(routeKey, target) || []
      const meta: RouteMetaInfo = { propertyName, path, type: routeType }
      existingRoutes.push(meta)
      // console.log('existingRoutes', existingRoutes)
      Reflect.defineMetadata(routeKey, existingRoutes, target)
    }
  }
}

// this will not get expose as we only use this internally
// This must be run on the overload method in the sub-class
// otherwise the meta data becomes empty
export function PREPARE_META_INFO(
  target: FastApi,
  _: string, // propertyName is unused, just placeholder it
  descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>
) {
  const fn = descriptor.value

  descriptor.value = function() {
    const meta = Reflect.getOwnMetadata(routeKey, target)
    if (!fn) {
      throw new Error(`Fn is undefined!`)
    }
    // console.log('meta', meta)
    return Reflect.apply(fn, this, [meta])
  }
}
// making the decorators
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
