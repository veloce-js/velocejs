// main class
import type {
  VeloceAstMap,
} from './types'
import type {
  MixedValidationInput
} from '@jsonql/validator/index'
import {
 Validators as JsonqlValidators,
 VALIDATE_KEY,
 VALIDATE_ASYNC_KEY,
 PLUGIN_KEY,
 PLUGIN_FN_KEY,
 PATTERN_KEY,
 RULES_KEY,
 NAME_KEY,
 PARAMS_KEY,
} from '@jsonql/validators'
import { outputFileSync } from 'fs-extra'
const KEYS = [VALIDATE_KEY, VALIDATE_ASYNC_KEY, PLUGIN_FN_KEY]
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

  /** wrap around the parent export method to add our processing */
  public exportAll(): any {
    const e = this.export()
    const o = { schema: {}, plugins: e.plugins }
    // do our processing here
    for (const propName in e.schema) {
      o.schema[propName] = e.schema[propName].rule
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
    let file = ''
    // for schema
    /*
    for (const propName in json.schema) {

    }
    */
    // for plugins, we might only support deliver plugin and inline fucntion all treat as server only
    plugins.forEach((plugin: any) => {
      KEYS.forEach((key: string) => {
        if (plugin[key]) {
          file += `const ${plugin[NAME_KEY]} = ${plugin[key].toString()}\n`
        }
      })
    })
    if (!filename) {
      return file
    }
    return outputFileSync(filename, file)
  }
}
