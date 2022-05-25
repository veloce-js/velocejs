// wrap the @jsonql/validator here
import { Validators } from '@velocejs/validators'
import {
  RULES_KEY,
  RULE_AUTOMATIC
} from './constants'
import { inArray } from '@jsonql/utils'
import { VeloceError } from '../lib/errors'
import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:lib:validator')

declare type GenericKeyValue = {
  [key: string]: any
}

export function createValidator(
  propertyName: string,
  argsList: Array<any>, // @TODO fix types
  vObj: Validators,
  validationInput: any, // @TODO fix types
  // plugins: Array<any> // @TODO fix types
) {
  // first need to check if they actually apply the @Validate decorator
  if (validationInput === false) {
    debug(`skip validation --> ${propertyName}`)
    // return a dummy handler - we need to package it up for consistency!
    return async (values: unknown) => values //  we don't need to do anyting now
  }
  debug('input -->', validationInput)
  assert(propertyName, argsList, validationInput)
  // @TODO we might need to subclass this and create a set global plugin

  if (plugins && plugins.length) {
    console.info('create plugins', plugins)
  }
  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    vObj.addValidationRules(validationInput[RULES_KEY])
  }
  // if we return it directly then it won't run
  return async (values: Array<any>) => vObj.validate(values)
}

/** validate aginst the dev input first */
function assert(
    propertyName: string,
    argsList: Array<any>,
    validationInput: any // @TODO fix types
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
