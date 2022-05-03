// wrap the @jsonql/validator here
// import { ValidatorFactory } from '@jsonql/validator'

export function createValidator(argsList: any, validationInput: any) {
  console.log(argsList)
  console.log(validationInput)
  // just stub it for now
  return async function(values: any) {
    console.log(values)
    return true
  }
}
