// wrap the @jsonql/validator here
import type {
  ValidatorsInstance,
  JsonqlValidationRule,
  ArgsListType,
} from '../types'
import {
  RULES_KEY,
  RULE_AUTOMATIC
} from './constants'
import { VeloceError } from '../lib/errors'
import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:lib:validator')

/** get the validator for the propertyName and add extra rules here */
export function createValidator(
  vObj: ValidatorsInstance,
  propertyName: string,
  argsList: Array<ArgsListType>,
  validationInput: JsonqlValidationRule,
) {
  debug(`createValidator ${propertyName} input -->`, argsList, validationInput)
  assertValidationInput(propertyName, argsList) //, validationInput)

  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    debug('addValidationRules', validationInput[RULES_KEY])
    vObj.addValidationRules(validationInput[RULES_KEY])
  }
  // if we return it directly then it won't run
  return async (values: Array<unknown>) => vObj.validate(values)
}

/** validate aginst the dev input first */
function assertValidationInput(
    propertyName: string,
    argsList: Array<ArgsListType>,
    // validationInput: JsonqlValidationRule
  ): void {
  // silly mistake
  if (!argsList.length) {
    throw new VeloceError(`${propertyName} has no parameters and therefore can not apply validation!`)
  }
  // check the name matches - this is problematic at this point the rules has not been converted
  /*
  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    const names: string[] = []
    for (const name in validationInput[RULES_KEY]) {
      names.push(name)
    }
    const wrongName = argsList.filter(arg => !names.includes(arg.name))
    if (wrongName.length) {
      throw new VeloceError(
        `${propertyName}: Some of your validation argument name is wrong!
        ${names.join(',')} NOT IN ${wrongName.map(w => w.name).join(',')}`
      )
    }
  }
  */
}
