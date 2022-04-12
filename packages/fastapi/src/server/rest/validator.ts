// Validator Decorator
// import { DescriptorMeta } from '../../types'
import { astKey, validationKey } from './keys'
import { astParser } from '../lib/ts-ast-parser'

export function Validate(options?: Array<any>) {
  console.log('Validate', options)

  return async (target: any, propertyName: string) => {

    console.log('propertyName', propertyName)
    
    const astMap = Reflect.getOwnMetadata(astKey, target)
    if (!astMap) {
      const map = await astParser(process.argv[1])
      Reflect.defineMetadata(astKey, map, target)
    }
    // @TODO should the dev input also get validated?
    const existingMap = Reflect.getOwnMetadata(validationKey, target) || {}
    if (!existingMap[propertyName]) {
      existingMap[propertyName] = options
    }
    Reflect.defineMetadata(validationKey, existingMap, target)
  }
}
