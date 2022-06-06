// main class
import type {
  VeloceAstMap,
  ClientPluginConfigs,
} from './types'
import type {
  MixedValidationInput,
} from '@jsonql/validator/index'
import { ValidatorsFeatures } from './validators-interface'
import {
 Validators as JsonqlValidators,
} from '@jsonql/validators'
import { Validator } from '@jsonql/validator'

/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export class Validators extends JsonqlValidators implements ValidatorsFeatures {

  /** main */
  constructor(astMap: VeloceAstMap) {
    super(astMap)
  }

  /**
    directly call the addValidationRules with the propertyName
    on the client side this get call after the contract loaded
  */
  public addRules(
    propertyName: string,
    rules: MixedValidationInput
  ): Validator {
    const val = this.getValidator(propertyName)
    val.addValidationRules(rules)

    return val as Validator // we return the validator to use
  }

  /** On the client side we don't need a map */
  public registerPlugins(
    pluginConfigs: ClientPluginConfigs
  ) {
    for (const name in pluginConfigs) {
      const config = pluginConfigs[name]
      this.registerPlugin(name, config)
    }
  }
}
