// Validator Decorator
import type {
  JsonValidationOption,
  MixedValidationInput,
} from '../types'
import { validationKey } from './keys'
import {
  RULES_KEY,
  OPTIONS_KEY,
  RULE_AUTOMATIC
} from '../lib/constants'
import { FastApiInterface } from '../lib/fast-api-interface'

// Validate Decorator
export function Validate(
  rules?: MixedValidationInput, // @TODO need to reply the types here
  options?: JsonValidationOption
) {

  return (target: FastApiInterface, propertyName: string) => {
    // @TODO should the dev input also get validated?
    const existingMap = Reflect.getOwnMetadata(validationKey, target) || {}
    // const existingRoute = Reflect.getOwnMetadata(routeKey, target) || []
    if (!existingMap[propertyName]) {
      // if this get apply to method but not rules, then we use the type info
      // and just check the type itself
      existingMap[propertyName] = {
        [RULES_KEY]: rules || RULE_AUTOMATIC,
        [OPTIONS_KEY]: options || {}
      }
    }
    // console.log('------------------ validator -----------------------')
    // console.dir(existingMap, { depth: null })

    Reflect.defineMetadata(validationKey, existingMap, target)
  }
}
