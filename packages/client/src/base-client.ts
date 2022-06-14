// base client for sub-classing
// cos we are going to have several different implementation of clients
import {
  JsonqlContractTemplate,
  JsonqlContractEntry,
  ValidateFn,
  JsonqlPropertyParamMap,
  Whatever
} from './types'
import { arrToObj } from '@jsonql/utils/dist/object'
import { ValidatorsClient } from '@jsonql/validators/dist/validators-client'
import { RETURN_AS_OBJ } from '@jsonql/validators'
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

  /**
  create the validator, now there will be a new field validate to indicate if
  this api actually need to validation
   */
  protected _getValidatorFn(
    entry: JsonqlContractEntry
  ): ValidateFn {
    const validator = this._validators.getValidator(entry.name as string)
    // TS stupid check for this ugly programming style not me
    if (entry && entry.params && entry.params.length === 0) {
      return async () => []
    } else if (entry.params && entry.validate === true) {
      const rules = arrToObj(entry.params, (params: JsonqlPropertyParamMap) => (
        params.rules ? { [ params.name ]: params.rules } : {}
      ))
      validator.addValidationRules(rules)
      const fn = 'validate'
      return {[fn]: async (args: Whatever[]) => Reflect.apply(
                                      validator.validate,
                                      validator,
                                      [args, RETURN_AS_OBJ]
                                    )}[fn]
    } else if (entry.validate === false) {
      const fn = 'noValdiate'
      return {[fn]: async (args: Whatever[]) => Reflect.apply(
                                      validator.prepareArgValues,
                                      validator,
                                      [args]
                                    )}[fn]
    }
  }
}
