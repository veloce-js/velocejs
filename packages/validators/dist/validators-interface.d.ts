import type { MixedValidationInput } from '@jsonql/validator/index';
import { Validator } from '@jsonql/validator';
export interface ValidatorsFeatures {
    addRules(propertyName: string, rules: MixedValidationInput): Validator;
    /** use a Generic here because the client and server has different implemtation */
    registerPlugins(pluginConfigs: any): void;
}
