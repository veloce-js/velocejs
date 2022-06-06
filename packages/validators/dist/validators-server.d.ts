import type { VeloceAstMap, ExportedSchema } from './types';
import type { MixedValidationInput, JsonqlValidationPlugin } from '@jsonql/validator/index';
import { ValidatorsServer } from '@jsonql/validators/dist/validators-server';
import { ValidatorsFeatures } from './validators-interface';
import { Validator } from '@jsonql/validator';
export declare class Validators extends ValidatorsServer implements ValidatorsFeatures {
    /** main */
    constructor(astMap: VeloceAstMap);
    /** wrap around the parent export method to add our processing */
    exportAll(): ExportedSchema;
    /** directly call the addValidationRules with the propertyName */
    addRules(propertyName: string, rules: MixedValidationInput): Validator;
    /** This is created for FastApi to dump a whole set of plugins registration from a Map */
    registerPlugins(pluginConfigs: Map<string, JsonqlValidationPlugin>): void;
}
