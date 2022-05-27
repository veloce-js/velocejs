import type { JsonqlValidationPlugin } from '@jsonql/validator-core/index';
import type { VeloceAstMap } from './types';
/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
export declare class Validators {
    private _astMap;
    private _validationRules;
    private _validators;
    private _plugin;
    /** main */
    constructor(_astMap: VeloceAstMap);
    /** get the validator */
    getValidator(propertyName: string): {
        addValidationRules: (input: any) => any;
        validate: (values: unknown[], raw?: boolean | undefined) => Promise<any>;
    };
    /** overload the ValidatorPlugin registerPlugin method */
    registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    /** export for contract */
    export(): {};
    /** store the rules for later export */
    private _appendRules;
    /** overload the Validator addValidationRules */
    private _addValidationRules;
}
