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
import { transformMainFn } from './common'
import { outputFileSync } from 'fs-extra'
import {
  SCHEMA_KEY,
  PLUGINS_KEY,
  VALIDATE_KEY,
  VALIDATE_ASYNC_KEY,
  PLUGIN_FN_KEY,
  NAME_KEY,
  RULES_KEY,
} from './constants'

const KEYS = [PLUGIN_FN_KEY, VALIDATE_KEY, VALIDATE_ASYNC_KEY]
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

  /**
    We only want the function and generate name for it and replace
    the function inside the json file (for the contract)
    then we will import it again on the client, they could use the name
    to call it again
  */
  public createScriptFile(filename?: string) {
    const { plugins } = this.exportAll()
    // for schema
    /*
    for (const propName in json.schema) {

    }
    */
    // for plugins, we might only support deliver plugin and inline fucntion all treat as server only
    const ctn = KEYS.length
    const files = plugins.map((plugin: any) => {
      for (let i=0; i<ctn; ++i) {
        const key = KEYS[i]
        if (plugin[key]) {
          return `const ${plugin[NAME_KEY]} = ${transformMainFn(plugin[key].toString())}`
        }
      }
      return ''
    })
    if (!filename) {
      return files.join('\n')
    }
    return outputFileSync(filename, files.join(''))
  }
}
