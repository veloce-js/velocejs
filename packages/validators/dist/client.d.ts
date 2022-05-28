import type { VeloceAstMap } from './types';
import { Validators as JsonqlValidators } from '@jsonql/validators';
export declare class ClientValidators extends JsonqlValidators {
    /**
      @TODO we might not init it this way
    */
    constructor(astMap: VeloceAstMap);
}
