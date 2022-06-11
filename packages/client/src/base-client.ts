// base client for sub-classing
// cos we are going to have several different implementation of clients
import {
  JsonqlContractTemplate,
  JsonqlContractEntry,
  ValidateFn,
  JsonqlPropertyParamMap,
} from './types'
import { arrToObj } from '@jsonql/utils/dist/object'
import { ValidatorsClient } from '@jsonql/validators/dist/validators-client'

// main
export class BaseClient {

  protected _validators: ValidatorsClient

  constructor(
    contract: JsonqlContractTemplate,
    protected _host = '/'
  ) {
    this._validators = this._prepareValidators(contract)
  }

  /** init the validators instance */
  protected _prepareValidators(contract: JsonqlContractTemplate) {
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
  protected _getValidatorFn(
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
