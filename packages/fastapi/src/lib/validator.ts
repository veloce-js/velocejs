// wrap the @jsonql/validator here
import type {
  ValidatorsInstance,
  JsonqlObjectValidateInput,
  ArgsListType,
} from '../types'
import {
  RULES_KEY,
  RULE_AUTOMATIC
} from './constants'
import { inArray } from '@jsonql/utils'
import { VeloceError } from '../lib/errors'
import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:lib:validator')
/*
declare type GenericKeyValue = {
  [key: string]: any
}
*/
export function createValidator(
  propertyName: string,
  argsList: Array<ArgsListType>, // @TODO fix types
  vObj: ValidatorsInstance,
  validationInput: JsonqlObjectValidateInput | boolean, // @TODO fix types
  // plugins: Array<any> // @TODO fix types
) {
  // first need to check if they actually apply the @Validate decorator
  if (validationInput === false) {
    debug(`skip validation --> ${propertyName}`)
    // return a dummy handler - we need to package it up for consistency!
    return async (values: unknown) => values //  we don't need to do anyting now
  }
  debug('createValidator input -->', validationInput)
  assert(propertyName, argsList, validationInput as JsonqlObjectValidateInput)
  if (validationInput[RULES_KEY] !== RULE_AUTOMATIC) {
    debug('addValidationRules', validationInput[RULES_KEY])
    vObj.addValidationRules(propertyName, validationInput[RULES_KEY])
  }
  // if we return it directly then it won't run
  return async (values: Array<unknown>) => vObj.validate(values)
}

/** validate aginst the dev input first */
function assert(
    propertyName: string,
    argsList: Array<ArgsListType>,
    validationInput: JsonqlObjectValidateInput // @TODO fix types if I use the ValidationInput then it doesnt work below
  ): void {
  // silly mistake
  if (!argsList.length) {
    throw new Error(`${propertyName} has no parameters and therefore can not apply validation!`)
  }
  // check the name matches
  // @ts-ignore keep saying this is going to be true ???
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
