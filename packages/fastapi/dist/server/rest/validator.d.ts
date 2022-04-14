import { JsonValidationOption, ValidationObjectRule, ValidationObjectSimpleRule } from '../../types';
import { FastApiInterface } from '../fast-api-interface';
/**
@TODO fix the type for rules

style one follow the async-validator

{
  fieldName: {
    rules: [

    ]
  }
}

follow the order of the arguments

[
  [
    {rules},
    {rules}
  ] // <== argument 1
]
**/
export declare function Validate(rules?: Array<ValidationObjectSimpleRule> | Array<Array<ValidationObjectSimpleRule>> | ValidationObjectRule, options?: JsonValidationOption): (target: FastApiInterface, propertyName: string) => void;
