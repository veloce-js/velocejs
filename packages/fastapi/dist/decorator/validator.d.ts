import type { JsonValidationOption, MixedValidationInput } from '../types';
import { FastApiInterface } from '../lib/fast-api-interface';
export declare function Validate(rules?: MixedValidationInput, // @TODO need to reply the types here
options?: JsonValidationOption): (target: FastApiInterface, propertyName: string) => void;
