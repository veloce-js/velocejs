// Validator Decorator
import { validationKey } from './keys'
import {
  // JsonValidationEntry,
  JsonValidationOption,
  ValidationObjectRule,
  ValidationObjectSimpleRule
} from '../../types'
import { FastApiInterface } from '../fast-api-interface'
import { RULES_KEY, OPTIONS_KEY, RULE_AUTOMATIC } from '../../constants'

// Validate Decorator
export function Validate(
  rules?: Array<ValidationObjectSimpleRule> |
          Array<Array<ValidationObjectSimpleRule>> |
          ValidationObjectRule,
  options?: JsonValidationOption
) {

  return (target: FastApiInterface, propertyName: string) => {
    // @TODO should the dev input also get validated?
    const existingMap = Reflect.getOwnMetadata(validationKey, target) || {}
    if (!existingMap[propertyName]) {
      // if this get apply to method but not rules, then we use the type info
      // and just check the type itself
      existingMap[propertyName] = {
        [RULES_KEY]: rules || RULE_AUTOMATIC,
        [OPTIONS_KEY]: options || {}
      }
    }
    Reflect.defineMetadata(validationKey, existingMap, target)
  }
}
