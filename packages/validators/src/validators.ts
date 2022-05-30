// main class
import type {
  VeloceAstMap,
} from './types'
import type {
  MixedValidationInput
} from '@jsonql/validator/index'
import {
 Validators as JsonqlValidators
} from '@jsonql/validators'

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

}
