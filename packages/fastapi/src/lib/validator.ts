// wrap the @jsonql/validator here
import { ValidatorFactory } from '@jsonql/validator'
import {
  RULES_KEY,
  // OPTIONS_KEY,
  RULE_AUTOMATIC
} from './constants'
import { inArray } from '@jsonql/utils'
import { VeloceError } from '../lib/errors'
import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:lib:validator')

export function createValidator(
  propertyName: string,
  argsList: any,
  validationInput: any,
  plugins: Array<any> // @TODO fix types
) {
  // first need to check if they actually apply the @Validate decorator
  if (validationInput === false) {
    debug(`${propertyName} skip validation`)
    // return a dummy handler
    return async (values: any) => values
  }

  debug(`propertyName`, propertyName)
  debug('argsList', argsList)
  debug('input', validationInput)

  assert(propertyName, argsList, validationInput)
  // @TODO we might need to subclass this and create a set global plugin
  const vObj = new ValidatorFactory(argsList)
  if (plugins && plugins.length) {
    console.info('create plugins', plugins)
  }
  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    vObj.createSchema(validationInput[RULES_KEY])
  }
  // return the validate method directly
  return (values: any[]) => {
    console.log('arg for validatar', values)
    return vObj.validate(values)
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
      throw new VeloceError(
        `${propertyName}: Some of your validation argument name is wrong!
        ${names.join(',')} NOT IN ${wrongName.map(w => w.name).join(',')}`
      )
    }
  }
}
