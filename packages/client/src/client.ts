/*
In this version we only take the static contract files here
if you want dynamic then create a wrapper around it.
The reason is since we need to build the client side anyway
*/
import {
  JsonqlContractTemplate,
  JsonqlContractEntry,
  FetchMethod,
  JsonqlValidationRule,
  ValidateFn,
  ArgsListType,
  JsonqlPropertyParamMap,
  GenericKeyValue,
} from './types'
import { ValidatorsClient } from '@jsonql/validators/dist/validators-client'

// main
export class HttpClient {

  protected _validators: ValidatorsClient

  constructor(
    _contract: JsonqlContractTemplate,
    private _fetch: FetchMethod
  ) {
    this._validators = this._prepareValidators(_contract)

    _contract.data.map((entry: JsonqlContractEntry) => {
      const propertyName = entry.name as string
      const validateFn = this._getValidatorFn(entry)
      // create the function
      this[propertyName] = (...args: any[]) => {
        console.log('pass the arguments', args, 'to call', entry)
        // set validator
        return validateFn(args)
                  .then((result: GenericKeyValue) => {

                  })
        // set http call
      }
    })
  }

  /** init the validators instance */
  private _prepareValidators(contract: JsonqlContractTemplate) {
    return new ValidatorsClient(
      contract.data.map((data: JsonqlContractEntry) => ({
        [data.name as string]: data.params as JsonqlPropertyParamMap[]
      }))
      .reduce((a, b) => Object.assign(a, b), {})
    )
  }

  /** create the validate or fake method */
  private _getValidatorFn(
    entry: JsonqlContractEntry
  ): ValidateFn {
    if (entry && entry.params && entry.params.length > 0) {
      const validator = this._validators.getValidator(entry.name as string)
      const rules = entry.params.map((params: any) => {
        if (params.rules) {
          return { [ params.name ]: params.rules }
        }
        return {}
      }).reduce((a, b)=> Object.assign(a, b), {})
      validator.addValidationRules(rules)

      return validator.validate
    }
    // return a dummy handler - we need to package it up for consistency!
    return async (values: unknown[]) => values //  we don't need to do anyting now
  }
}
