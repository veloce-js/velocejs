// the @velocejs/validators/client
import type { VeloceAstMap } from './types'
import { Validators as JsonqlValidators } from '@jsonql/validators'


export class ClientValidators extends JsonqlValidators {

  /**
    @TODO we might not init it this way 
  */
  constructor(astMap: VeloceAstMap) {
    super(astMap)
  }
}
