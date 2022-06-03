import type { JsonValidationOption } from '../types';
import type { MixedValidationInput } from '@velocejs/validators/index';
import { FastApiInterface } from '../lib/fast-api-interface';
export declare function Validate(rules?: MixedValidationInput, // @TODO need to reply the types here
options?: JsonValidationOption): (target: FastApiInterface, propertyName: string) => void;
