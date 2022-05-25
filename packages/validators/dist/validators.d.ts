import type { JsonqlValidationPlugin } from '@jsonql/validator-core/index';
import type { VeloceAstMap, ValidationRuleRecord } from './types';
import { ValidatorFactory } from '@jsonql/validator';
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
        addValidationRules: (input: ValidationRuleRecord) => void;
        validate: (values: unknown[], raw?: boolean | undefined) => Promise<any>;
    };
    registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    loadExtPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    addValidationRules(propertyName: string, obj: ValidatorFactory): (input: ValidationRuleRecord) => void;
    export(): {};
    /** store the rules for later export */
    private _appendRules;
}
