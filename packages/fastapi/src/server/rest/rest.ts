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

// @BUG it's a shame we couldn't make this more elegant
// because if we use the process.argv[1] to find the file location - it change depends on where we call it
// therefore the parser couldn't find the file
// hence we need this ugly hack to get around the problem
export function Rest<T extends { new (...args: any[]): {} }>(constructor: T) {
  // Voodoo magic
  const stacks = new Error().stack?.split('\n').filter(line => line.indexOf('__decorateClass') > -1)
  const where = stacks ? stacks[stacks.length - 1].split('(')[1].split(':')[0] : ''
  // from https://stackoverflow.com/questions/51124979/typescript-calling-class-methods-inside-constructor-decorator
  // But this will create a Typescript error `method prepare does not exist on Anonymous class`
  // another way to get around with the properties not able to bind to the constructor.protoype
  // https://stackoverflow.com/questions/48599889/typescript-adding-methods-with-decorator-type-does-not-exist
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      astParser(where)
        .then(map => {
          const existingRoutes = Reflect.getOwnMetadata(routeKey, constructor.prototype) || []
          const validations = Reflect.getOwnMetadata(argsKey, constructor.prototype) || []
          // @ts-ignore: prepare does not exist on Anonymous class (it does on FastApi)
          this.prepare && this.prepare(
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
