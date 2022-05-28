// main class
import type {
  VeloceAstMap,
} from './types'
import {
 Validators as JsonqlValidators
} from '@jsonql/validators'

import debugFn from 'debug'
const debug = debugFn('velocejs:validator:main')

/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export class ServerValidators extends JsonqlValidators {

  /** main */
  constructor(astMap: VeloceAstMap) {
    super(astMap)
  }

  public exportSchema() {
    debug('@TODO export the schema for contract')
  }

  public exportScript() {
    debug('@TODO export the extra validation rule to a file')
  }

}
