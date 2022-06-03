import type { VeloceAstMap, ExportedSchema } from './types';
import type { MixedValidationInput, JsonqlValidationPlugin } from '@jsonql/validator/index';
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
    /** This is created for FastApi to dump a whole set of plugins registration from a Map */
    registerPlugins(pluginConfigs: Map<string, JsonqlValidationPlugin>): void;
    /** wrap around the parent export method to add our processing */
    exportAll(): ExportedSchema;
    /**
      We only want the function and generate name for it and replace
      the function inside the json file (for the contract)
      then we will import it again on the client, they could use the name
      to call it again
    */
    createScriptFile(filename?: string): any;
}
