// wrap the @jsonql/validator here
// import { ValidatorFactory } from '@jsonql/validator'
import {
  RULES_KEY,
  // OPTIONS_KEY,
  RULE_AUTOMATIC
} from './constants'
import { inArray } from '@jsonql/utils'

export function createValidator(
  propertyName: string,
  argsList: any,
  validationInput: any
) {
  // first need to check if they actually apply the @Validate decorator
  if (validationInput === false) {
    // return a dummy handler
    return async (values: any) => values
  }
  console.log('argsList', argsList)
  console.log('input', validationInput)

  assert(propertyName, argsList, validationInput)

  // just stub it for now
  return async function(values: any) {
    console.log('value', values)
    return true
  }
}

/** validate aginst the dev input first */
function assert(
    propertyName: string,
    argsList: Array<any>,
    validationInput: any
  ): void {
  // silly mistake
  if (!argsList.length) {
    throw new Error(`${propertyName} has no parameters and therefore can not apply validation!`)
  }
  // check the name matches
  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    const names: string[] = []
    for (const name in validationInput[RULES_KEY]) {
      names.push(name)
    }
    const wrongName = argsList.filter(arg => !inArray(names, arg.name))
    if (wrongName.length) {
      throw new Error(`${propertyName}: Some of your validation argument name is wrong! ${names.join(',')}`)
    }
  }
}
