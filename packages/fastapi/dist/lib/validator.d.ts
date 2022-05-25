import type { ValidatorsInstance, JsonqlValidationRule, ArgsListType } from '../types';
/** get the validator for the propertyName and add extra rules here */
export declare function createValidator(propertyName: string, argsList: Array<ArgsListType>, vObj: ValidatorsInstance, validationInput: JsonqlValidationRule): (values: Array<unknown>) => Promise<unknown[]>;
