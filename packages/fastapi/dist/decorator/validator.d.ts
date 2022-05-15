import type { JsonValidationOption } from '../types';
import { FastApiInterface } from '../lib/fast-api-interface';
export declare function Validate(rules?: any, // @TODO need to reply the types here
options?: JsonValidationOption): (target: FastApiInterface, propertyName: string) => void;
