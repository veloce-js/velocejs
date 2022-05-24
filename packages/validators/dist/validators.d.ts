import type { JsonqlValidationPlugin } from '@jsonql/validator-core/index';
import type { VeloceAstMap, AddValidationRuleFn, ValidationRuleRecord } from './types';
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
        validate: ((values: unknown[], raw?: boolean | undefined) => Promise<any>) | undefined;
    };
    registerPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    loadExtPlugin(name: string, pluginConfig: JsonqlValidationPlugin): void;
    addValidationRules(propertyName: string, orgAddValidationRule: AddValidationRuleFn): (input: ValidationRuleRecord) => void;
    export(): {};
    /** store the rules for later export */
    private _appendRules;
}
