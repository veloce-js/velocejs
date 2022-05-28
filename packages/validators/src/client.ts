// the @velocejs/validators/client
import type { VeloceAstMap } from './types'
import { Validators as JsonqlValidators } from '@jsonql/validators'

// also call Validators just include from different path  
export class Validators extends JsonqlValidators {

  /**
    @TODO we might not init it this way
  */
  constructor(astMap: VeloceAstMap) {
    super(astMap)
  }
}
