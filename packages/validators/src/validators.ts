// main class
import type {
  VeloceAstMap,
  ExportedSchema,
} from './types'
import type {
  MixedValidationInput,
  JsonqlValidationPlugin,
} from '@jsonql/validator/index'
import {
 Validators as JsonqlValidators,
} from '@jsonql/validators'
import {
  SCHEMA_KEY,
  PLUGINS_KEY,
  RULES_KEY,
} from './constants'

/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export class Validators extends JsonqlValidators {

  /** main */
  constructor(astMap: VeloceAstMap) {
    super(astMap)
  }

  /** directly call the addValidationRules with the propertyName */
  public addRules(
    propertyName: string,
    rules: MixedValidationInput
  ) {
    const val = this.getValidator(propertyName)
    val.addValidationRules(rules)

    return val // we return the validator to use
  }

  /** This is created for FastApi to dump a whole set of plugins registration from a Map */
  public registerPlugins(
    pluginConfigs: Map<string, JsonqlValidationPlugin>
  ) {
    pluginConfigs.forEach((config: JsonqlValidationPlugin, name: string) => {
      this.registerPlugin(name, config)
    })
  }

  /** wrap around the parent export method to add our processing */
  public exportAll(): ExportedSchema {
    const e = this.export()
    const o = { [SCHEMA_KEY]: {}, [PLUGINS_KEY]: e[PLUGINS_KEY] }
    // do our processing here
    for (const propName in e[SCHEMA_KEY]) {
      o[SCHEMA_KEY][propName] = e[SCHEMA_KEY][propName][RULES_KEY]
    }
    return o
  }
}
