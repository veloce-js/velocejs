/*
In this version we only take the static contract files here
if you want dynamic then create a wrapper around it.
The reason is since we need to build the client side anyway
*/
import {
  JsonqlContractTemplate,
  JsonqlContractEntry,
  ValidateFn,
  ArgsListType,
  JsonqlPropertyParamMap,
  GenericKeyValue,
  HttpMethod,
} from './types'
import { WEBSOCKET_METHOD } from './constants'
import { ValidatorsClient } from '@jsonql/validators/dist/validators-client'
import { arrToObj } from '@jsonql/utils/dist/object'

// main
export class HttpClient {
  // index signature
  // [propertyName: string]: (...args: any[]) => Promise<GenericKeyValue>
  // other properties
  protected _validators: ValidatorsClient

  constructor(
    contract: JsonqlContractTemplate,
    protected _httpMethod: HttpMethod,
    protected _host = '/'
  ) {
    this._validators = this._prepareValidators(contract)

    contract.data.forEach((entry: JsonqlContractEntry) => {
      const { name, type } = entry
      if (type === WEBSOCKET_METHOD) {
        return // skip it
      }
      const validateFn = this._getValidatorFn(entry)
      // create the function as seen in
      // https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
      // its not amazing but at least we can see the name in console.log
      // @TODO how to pass the type info to the arguments
      this[name] = {[name]: async function(...args: ArgsListType[]) {
        console.log('pass the arguments', args, 'to call', entry)
        // set validator
        return validateFn(args)
                  .then((result: GenericKeyValue) =>
                    this._executeHttpCall(entry, result)
                  )
      }}[name]
    })
  }

  /** create the http calls */
  private _executeHttpCall(
    entry: JsonqlContractEntry,
    result: GenericKeyValue
  ) {
    console.log(entry)
    console.log(result)
    // now call fetch
  }

  /** init the validators instance */
  private _prepareValidators(contract: JsonqlContractTemplate) {
    return new ValidatorsClient(
      arrToObj(
        contract.data,
        (data: JsonqlContractEntry) => ({
          [data.name as string]: data.params as JsonqlPropertyParamMap[]
        })
      )
    )
  }

  /** create the validate or fake method */
  private _getValidatorFn(
    entry: JsonqlContractEntry
  ): ValidateFn {
    if (entry && entry.params && entry.params.length > 0) {
      const validator = this._validators.getValidator(entry.name as string)
      const rules = arrToObj(entry.params, (params: JsonqlPropertyParamMap) => (
        params.rules ? { [ params.name ]: params.rules } : {}
      ))
      validator.addValidationRules(rules)

      return validator.validate
    }
    // return a dummy handler - we need to package it up for consistency!
    return async (values: unknown[]) => values //  we don't need to do anyting now
  }
}
