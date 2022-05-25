import type { ValidatorsInstance, JsonqlObjectValidateInput } from '../types';
export declare function createValidator(propertyName: string, argsList: Array<any>, // @TODO fix types
vObj: ValidatorsInstance, validationInput: JsonqlObjectValidateInput | boolean): ((values: unknown) => Promise<unknown>) | ((values: Array<unknown>) => Promise<unknown[]>);
