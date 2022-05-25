import { Validators } from '@velocejs/validators';
export declare function createValidator(propertyName: string, argsList: Array<any>, // @TODO fix types
vObj: Validators, validationInput: any): (values: Array<any>) => Promise<any>;
