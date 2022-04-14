// using the async-validator https://github.com/yiminghe/async-validator/
import Schema from 'async-validator'
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
export function createDescriptor(argNames: string[], validationInput: any) {
  console.log(argNames)
  console.dir(validationInput, { depth: null })
}

// this will get call inside the FastApi
export function createValidator(argNames, validationInput) {
  const descriptor = createDescriptor(argNames, validationInput)
  const validator = new Schema(descriptor)

  // we just return the actual fn
  // return validator.validate
  // return a dummy for now
  return (...args: any[]) => Promise.resolve(args)
}


// Map the alias to our json schema
const stringSH = {
  max: 'maxLength',
  '<=': 'maxLength',
  min: 'minLength',
  '>=': 'minLength'
}
const numSH = Object.assign(stringSH, {
  less: 'exclusiveMaxmimum',
  '<': 'exclusiveMaxmimum',
  greater: 'exclusiveMinimum',
  '>': 'exclusiveMinimum'
})
