// main class
import type {
  JsonqlValidationPlugin,
} from '@jsonql/validator-core/index'
import type {
  VeloceAstMap,
  ValidationRuleRecord,
} from './types'
import {
  ValidatorPlugins,
  Validator
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
  private _validators = new Map<string, Validator>()
  private _plugin = new ValidatorPlugins()

  /** main */
  constructor(private _astMap: VeloceAstMap) {
    for (const propertyName in this._astMap) {
      this._validators.set(
        propertyName,
        new Validator(this._astMap[propertyName], this._plugin)
      )
    }
  }

  /** get the validator */
  public getValidator(propertyName: string) {
    if (this._validators.has(propertyName)) {
      const obj = this._validators.get(propertyName) as Validator
      // overload the method here
      return {
        addValidationRules: this._addValidationRules(propertyName, obj),
        validate: obj.validate.bind(obj)
      }
    }
    throw new Error(`${propertyName} validator is not registered!`)
  }

  // ------------------- OVERLOAD ----------------------//

  /** overload the ValidatorPlugin registerPlugin method */
  public registerPlugin(
    name: string,
    pluginConfig: JsonqlValidationPlugin
  ) {
    this._plugin.registerPlugin(name, pluginConfig)
  }

  /** export for contract */
  public export() {
    const result = {}
    this._validationRules.forEach((value: ValidationRuleRecord, key: string) => {
      result[key] = value
    })
    debug('export schema', result)
    return result
  }
  /*
  @TODO
  When to add
  1. when a rule is add we check if this is internal plugin and not mark as `server`
  2. When a rule is insert via loadExtPlugin and the original plugin was not mark as server

  IDEA
  we could extract the inline code and store it in file (or just in memeory)
  and insert a new url (e.g. /veloce/plugin) then serve it up to the client
  */
  /** store the rules for later export */
  private _appendRules(propertyName: string, input: ValidationRuleRecord) {
    if (this._validationRules.has(propertyName)) {
      const existingRules = this._validationRules.get(propertyName) as ValidationRuleRecord[]
      this._validationRules.set(propertyName, existingRules.concat([input]))
    } else {
      debug('adding new rule', input)
      this._validationRules.set(propertyName, [input])
    }
  }

  /** overload the Validator addValidationRules */
  private _addValidationRules(
    propertyName: string,
    obj: Validator
  ) {
    return (input: ValidationRuleRecord) => {
      this._appendRules(propertyName, input)
      return Reflect.apply(obj.addValidationRules, obj, [input])
    }
  }
}
