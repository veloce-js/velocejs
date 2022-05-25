import type { ValidatorsInstance, JsonqlObjectValidateInput, ArgsListType } from '../types';
export declare function createValidator(propertyName: string, argsList: Array<ArgsListType>, // @TODO fix types
vObj: ValidatorsInstance, validationInput: JsonqlObjectValidateInput | boolean): ((values: unknown) => Promise<unknown>) | ((values: Array<unknown>) => Promise<unknown[]>);
