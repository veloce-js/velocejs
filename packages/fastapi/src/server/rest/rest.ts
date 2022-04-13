/**
  We change the thinking about how to init the server
  before it was using the Prepare method that needs to call super.run
  which is ugly

  Here we will try to apply the Decorator at the Class level
  and see if we could do it with just init the new class and everything should run
*/
import { RouteMetaInfo /*, JsonValidationEntry*/ } from '../../types'
import { routeKey, argsKey } from './keys'
import { astParser } from '../lib/ts-ast-parser'
import { PARAMS_KEY } from '../../constants'

export function Rest<T extends { new (...args: any[]): {} }>(constructor: T) {
  // from https://stackoverflow.com/questions/51124979/typescript-calling-class-methods-inside-constructor-decorator
  // But this will create a Typescript error `method prepare does not exist on Anonymous class`
  // another way to get around with the properties not able to bind to the constructor.protoype
  // https://stackoverflow.com/questions/48599889/typescript-adding-methods-with-decorator-type-does-not-exist
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      astParser(process.argv[1])
        .then(map => {
          const existingRoutes = Reflect.getOwnMetadata(routeKey, constructor.prototype) || []
          const validations = Reflect.getOwnMetadata(argsKey, constructor.prototype) || []
          // @TODO merge the argument list into the exitingRoutes
          // @TODO merge the map into the valdiations

          // @ts-ignore: prepare does not exist on Anonymous class (it does on FastApi)
          this.prepare(
            mergeMapToRoute(map, existingRoutes),
            mergeMapToValidation(map, validations)
          )
        })
    }
  }
}

// merge the AST Map data into the route info map
// then we don't need to extract the param twice
function mergeMapToRoute(map: object, existingRoutes: Array<RouteMetaInfo>) {

  return existingRoutes.map(route => {
    if (map[route.propertyName]) {
      route.args = map[route.propertyName]
    }

    return route
  })
}

// merge map info to the valdiation info
function mergeMapToValidation(map: object, validations: object): object {
  const tmp = {}
  for (const propertyName in validations) {
    tmp[propertyName] = Object.assign(
      validations[propertyName],
      { [PARAMS_KEY]: map[propertyName] }
    )
  }

  return tmp
}
