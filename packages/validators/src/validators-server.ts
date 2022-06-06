// The new serverside implmentation for the Validators
// here is a problem some of the method will be duplicated from the clients version
// because there is no good way to implment it in the Typescript / Javascrpt class system
import type {
  VeloceAstMap,
  ExportedSchema
} from './types'
import type {
  MixedValidationInput,
  JsonqlValidationPlugin,
} from '@jsonql/validator/index'
import { ValidatorsServer } from '@jsonql/validators/dist/validators-server'
import { ValidatorsFeatures } from './validators-interface'
import { Validator } from '@jsonql/validator'
import {
  SCHEMA_KEY,
  PLUGINS_KEY,
  RULES_KEY,
} from './constants'

// main
export class Validators extends ValidatorsServer implements ValidatorsFeatures {

  /** main */
  constructor(astMap: VeloceAstMap) {
    super(astMap)
  }

  /** wrap around the parent export method to add our processing */
  public exportAll(): ExportedSchema {
    const e = this.export()
    const o = {
      [SCHEMA_KEY]: {},
      [PLUGINS_KEY]: e[PLUGINS_KEY]
    }
    // do our processing here
    for (const propName in e[SCHEMA_KEY]) {
      o[SCHEMA_KEY][propName] = e[SCHEMA_KEY][propName][RULES_KEY]
    }
    return o
  }

  /** directly call the addValidationRules with the propertyName */
  public addRules(
    propertyName: string,
    rules: MixedValidationInput
  ): Validator {
    const val = this.getValidator(propertyName)
    val.addValidationRules(rules)

    return val as Validator // we return the validator to use
  }

  /** This is created for FastApi to dump a whole set of plugins registration from a Map */
  public registerPlugins(
    pluginConfigs: Map<string, JsonqlValidationPlugin>
  ) {
    pluginConfigs.forEach((config: JsonqlValidationPlugin, name: string) => {
      this.registerPlugin(name, config)
    })
  }
}
