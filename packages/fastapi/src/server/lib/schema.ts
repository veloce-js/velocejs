// using the async-validator https://github.com/yiminghe/async-validator/
import Schema from 'async-validator'
import {
  RULE_AUTOMATIC,
  RULE_LIST,
  RULE_SIMPLE,
  RULE_FULL,
  OPTIONS_KEY,
  RULES_KEY
} from '../../constants'
import { checkTypeOfRules } from './validate-types'
/*
Here is the design idea:
1. Using the JSON Schema validation rules and keywords
2. Allow overwrite the type (type are extract automatially from their typescript expression)
3. keyword validation such as pattern: EMAIL
4. For rules that use the validator (sync) or asyncValidator or mark with 'server': true will be server side only
5. If they pass the rules as an object then the field name expect to be key
6. if they pass as an array, then we map it with the same order as in their argument list
7. when validation failed we return a 417 status or the dev can override it per route or globally
*/
export function createDescriptor(argList: string[], validationInput: any) {
  console.log('----------------- createDescriptor -----------------')
  console.log(argList)
  console.dir(validationInput, { depth: null })
  const inputType = checkTypeOfRules(validationInput)
  switch (inputType) {
    case RULE_AUTOMATIC:
      return createAutomatic(argList)
    case RULE_LIST:
      return transformList(argList, validationInput)
    case RULE_SIMPLE:
      return transformSimple(argList, validationInput)
    case RULE_FULL:
      return transformFullObj(argList, validationInput)
    default:
      // throw again?
  }
}
// use the AST data to generate validation descriptor
function createAutomatic(argList: any[]) {

  return argList.map(list => {
    return {
      [list.name]: list.types.map( type => {
        return {
          required: list.required,
          type: type.type
        }
      })
    }
  })
  .reduce<Record<string, any>>((a, b) => Object.assign(a,b), {})
}

function transformList() {

}

function transformSimple() {

}

function transformFullObj(argList: any[], validationInput: any) {
  const descriptor = {}
  for (const name in validationInput) {
    const entry = argList.filter(list => list.name === name)[0]
    if (Array.isArray(entry.types)) {
      // @TODO what to do
      console.log('entry.types', entry.types)
    } else {
      descriptor[name] = validationInput[name].rules.map(input => {
        return Object.assign({
          required: entry.required,
          type: entry.types.type, // @TODO need to check
        }, input)
      })
    }
  }

  console.dir(descriptor, { depth: null })

  return descriptor
}

// this will get call inside the FastApi
export function createValidator(argList: string[], validationInput: any) {
  // nothing to validate
  if (!validationInput) {
    return (...args: any[]): Promise<boolean> => (
      Promise.resolve(true)
    )
  }
  const descriptor = createDescriptor(argList, validationInput[RULES_KEY])
  const validator = new Schema(descriptor)
  // we just return the actual fn
  // return validator.validate
  // return a dummy for now
  return (...args: any[]) => {
    return Reflect.apply(validator.validate, null, args)
                  .then((result) => (
                    {
                      result,
                      [OPTIONS_KEY]: validationInput[OPTIONS_KEY]
                    }
                  ))
  }
}


// Map the alias to our json schema
export const strAlias = {
  max: 'maxLength',
  '<=': 'maxLength',
  min: 'minLength',
  '>=': 'minLength'
}
export const numAlias = Object.assign(strAlias, {
  less: 'exclusiveMaxmimum',
  '<': 'exclusiveMaxmimum',
  greater: 'exclusiveMinimum',
  '>': 'exclusiveMinimum'
})
