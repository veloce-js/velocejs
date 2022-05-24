// main class
import type {
  VeloceAstMap,
  AddValidationRuleFn,
  ValidationRuleRecord
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
export class Validators {
  private _validationRules = new Map<string, ValidationRuleRecord>()
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
      // we need to overload the methods here
      return {
        addValidationRule: this.addValidationRule(propertyName, obj.addValidationRule),
        validate: obj.validate.bind(obj)
      }
    }
    throw new Error(`${propertyName} validator is not registered!`)
  }

  // ------------------- OVERLOAD ----------------------//

  public registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ) {
    this._plugin.registerPlugin(name, pluginConfig)
  }

  public loadExtPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ) {
    this._plugin.loadExtPlugin(name, pluginConfig)
  }

  public addValidationRule(
    propertyName: string,
    orgAddValidationRule: AddValidationRuleFn
  ) {
    return (input: ValidationRuleRecord) => {
      this._appendRules(propertyName, input)
      orgAddValidationRule(input)
    }
  }
  
  public export() {
    debug('@TODO export all schema')
  }

  /** store the rules for later export */
  private _appendRules(propertyName: string, input: ValidationRuleRecord) {
    let existingRules: Array<ValidationRuleRecord> = []
    if (this._validationRules.has(propertyName)) {
      existingRules = this._validationRules.get(propertyName)
    }
    existingRules = existingRules.concat([input])
    this._validationRules.set(propertyName, existingRules.concat([input]))
  }
}
