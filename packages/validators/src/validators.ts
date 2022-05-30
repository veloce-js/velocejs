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

import debugFn from 'debug'
const debug = debugFn('velocejs:validator:main')

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
  ): void {
    this.getValidator(propertyName).addValidationRules(rules)
  }

  /** wrap around the parent export method to add our processing */
  public exportAll(): any {
    debug('@TODO export the schema for contract')
    const schema = this.export()
    // do our processing here
    return schema
  }

}
