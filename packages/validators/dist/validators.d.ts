import type { VeloceAstMap } from './types';
import { Validators as JsonqlValidators } from '@jsonql/validators';
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export declare class Validators extends JsonqlValidators {
    /** main */
    constructor(astMap: VeloceAstMap);
    exportSchema(): void;
    exportScript(): void;
}
