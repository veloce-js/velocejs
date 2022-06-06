import type { VeloceAstMap, ClientPluginConfigs } from './types';
import type { MixedValidationInput } from '@jsonql/validator/index';
import { ValidatorsFeatures } from './validators-interface';
import { Validators as JsonqlValidators } from '@jsonql/validators';
import { Validator } from '@jsonql/validator';
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
export declare class Validators extends JsonqlValidators implements ValidatorsFeatures {
    /** main */
    constructor(astMap: VeloceAstMap);
    /**
      directly call the addValidationRules with the propertyName
      on the client side this get call after the contract loaded
    */
    addRules(propertyName: string, rules: MixedValidationInput): Validator;
    /** On the client side we don't need a map */
    registerPlugins(pluginConfigs: ClientPluginConfigs): void;
}
