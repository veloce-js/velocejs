import type { VeloceAstMap } from './types';
import type { MixedValidationInput } from '@jsonql/validator/index';
import { Validators as JsonqlValidators } from '@jsonql/validators';
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export declare class Validators extends JsonqlValidators {
    /** main */
    constructor(astMap: VeloceAstMap);
    /** directly call the addValidationRules with the propertyName */
    addRules(propertyName: string, rules: MixedValidationInput): {
        addValidationRules: (input: import("@jsonql/validators/dist/types").ValidationRuleRecord) => any;
        validate: (values: unknown[], raw?: boolean | undefined) => Promise<any>;
    };
    /** wrap around the parent export method to add our processing */
    exportAll(): any;
}
