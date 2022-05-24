// main class
import type {
  JsonqlValidationPlugin,
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlPropertyParamMap,
} from '@jsonql/validator/index'

import type {
  VeloceAstMap
} from './types'

import {
  ValidatorPlugins,
  ValidatorFactory
} from '@jsonql/validator'
import debugFn from 'debug'

const debug = debugFn('velocejs:validator:main')


/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
export class VeloceValidator {

  private _validators = new Map<string, ValidatorFactory>()
  private _plugin = new ValidatorPlugins()

  /** main */
  constructor(private _astMap: VeloceAstMap) {
    for (const propertyName in this._astMap) {
      this._validators.set(
        propertyName,
        new ValidatorFactory(this._astMap[propertyName], this._plugin)
      )
    }
  }

  /** get the validator */
  public getValidator(propertyName: string) {
    if (this._validators.has(propertyName)) {
      const obj = this._validators.get(propertyName)
      return obj?.validate.bind(obj)
    }
    throw new Error(`${propertyName} validator is not registered!`)
  }

  // ------------------- OVERLOAD ----------------------//

  public registerPlugin() {
    debug('@TODO registerPlugin')
  }

  public addValidationRule() {
    debug('@TODO addValidationRule')
  }

}
