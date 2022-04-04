// the new Validator decorator
// import 'reflect-metadata'
import { argsKey } from './routekey'
import { ValidationEntry } from '../../types'
/*
@Validator([
  {
    name: 'paramName',
    rules: [

    ]
  },
])
*/
export function Validator(argMap: Array<ValidationEntry>) {

  return (target: any, propertyName: string /*, descriptor: any */): void => {
    // using the reflect-metadata built-in key
    const exisitingValidation = Reflect.getOwnMetadata(argsKey, target) || {}
    // @TODO can we do some simple validation here such as checking if the argument list match in length?
    exisitingValidation[propertyName] = argMap

    Reflect.defineMetadata(argsKey, exisitingValidation, target)
  }
}
