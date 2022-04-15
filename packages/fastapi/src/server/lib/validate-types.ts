import { RULE_LIST, RULE_SIMPLE, RULE_FULL, RULE_AUTOMATIC } from '../../constants'

//////////////////////// JSON SCHEMA VALIDATION RULES ////////////////////////

export declare type StringValidateRules = {
  maxLength?: number // (less than or equal to)
  minLength?: number // (more than or equal to)
  pattern?: string // not this is a regex in string
}

export declare type StringValidateRulesAlias = {
  max?: number // <-- alias to maxLength
  min?: number // <-- alias to minLength
}

export type JsonValidateStringRule = StringValidateRules & StringValidateRulesAlias

export declare type NumericValidateRules = {
  multipleOf?: number // integer
  maximum?: number // (less than or equal to)
  exclusiveMaxmimum?: number // less than
  minimum?: number // more than or equal to
  exclusiveMinimum?: number // more than
}

export declare type NumericValidateRulesAlias = {
  less?: number // <-- alias to exclusiveMaximum
  greater?: number // <-- alias to exclusiveMinimum
}

export type JsonValidateNumericRule =
  StringValidateRulesAlias &
  NumericValidateRules &
  NumericValidateRulesAlias
// no alias
export declare type JsonValidateArrayRule = {
  items?: Array<any>
  additionalItems?: Array<any>
  maxItems?: number // unsigned integer
  minItems?: number // unsigned integer
  uniqueItems?: boolean // if the items are unique as in a Set
  contains?: any // this required to be a JSON Schema which meeans the array contains one of these valid JSON Schmea validated item
}

export declare type ObjectValidateRules = {
  maxProperties?: number
  minProperties?: number
  required?: boolean
  properties?: any
  patternProperties?: string
  additonalPropties?: any
  dependencies?: any
  propertyNames?: string | symbol
}

export declare type ObjectValidateRulesAlias = {
  maxProps?: number // <-- alias to maxProperties
  minProps?: number // <-- alias to minProperties
  props?: any // <-- alias to properties
  patternProps?: string // <-- alias to patternProperties
  addProps?: any // <-- alias to addProps
  deps?: any // <-- alias to dependencies
}

export type JsonValidateObjectRule =
  ObjectValidateRules & ObjectValidateRulesAlias

// Validation Type - using the JSON Schema Validation standard
export type JsonValidationEntry = {
  index?: number
  name?: string
  type?: string
  required?: boolean
  rules?: Array<
    JsonValidateStringRule |
    JsonValidateNumericRule |
    JsonValidateArrayRule |
    JsonValidateObjectRule>
}
// This is the object structure we will pass to create the Validator
export type ValidationObjectRule = {
  [argName: string]: {
    required?: boolean
    rules: Array<ValidationObjectRuleEntry>
    [propName: string]: any
  }
}

export type ValidationObjectRuleEntry = {
  required?: boolean
  type?: string
  message?: string
  [key: string]: any
}

/*
  This is the inner simple rules
*/
export type ValidationObjectSimpleRule = {
  [key: string]: string | number // the key will be one of the available keyword from above @TODO write them out
  message?: string
  required?: boolean
  server?: boolean
}
// this will check if the validator rules is correct or not
export const checkTypeOfRules = (rules: unknown): string => {
  if (Array.isArray(rules)) {
    if (rules.length) {
      return Array.isArray(rules[0]) ? RULE_LIST : RULE_SIMPLE
    }
  }
  if (typeof rules === 'object' && !Array.isArray(rules)) {
    for (const name in rules) {
      rules[name]
      if (Object.prototype.hasOwnProperty.call(rules[name], 'rules')) {
        return RULE_FULL
      }
    }
  }
  console.log('rules', rules)
  throw new Error(`Unknown validation rule structure!`)
}

export type JsonValidationOption = {
  status?: number
}

/*
check primitive type as well as custom types

• string : Must be of type string . This is the default type.
• number : Must be of type number .
• boolean : Must be of type boolean .
• method : Must be of type function .
• regexp : Must be an instance of RegExp or a string that does not generate an
exception when creating a new RegExp .
• integer : Must be of type number and an integer.
• float : Must be of type number and a ﬂoating point number.
• array : Must be an array as determined by Array.isArray .
• object : Must be of type object and not Array.isArray .
• enum : Value must exist in the enum .
• date : Value must be valid as determined by Date
• url : Must be of type url .
• hex : Must be of type hex .
• email : Must be of type email .
• any : Can be any type
*/
// this is quite useless really

const lettersRegexp = /^[A-Za-z]+$/;
const numberRegexp = /^[0-9]+$/;

export interface TypeValidator<T> {
  isAcceptable(s: T): boolean
}

export class LettersRegexpOnlyValidation implements TypeValidator<string> {
  isAcceptable(s: string) {
    return lettersRegexp.test(s)
  }
}

export class NumericOnlyValidation implements TypeValidator<number> {

  isAcceptable(s: unknown) {
    return numberRegexp.test(s as string)
  }
}



// example from https://dev-tips.com/typescript/ensuring-reliable-typings-using-typescripts-type-guards#:~:text=To%20allow%20such%20type%20detection%2Fvalidation%2C%20TypeScript%20uses%20type,a%20certain%20type%20for%20a%20certain%20scope.%20typeof
/*
type Post = {
  id: number;
  title: string;
  text: string;
};

const isValidPost = (input: unknown): input is Post => {
  return (
    typeof input === 'object' &&
    input !== null &&
    Object.prototype.hasOwnProperty.call(input, 'id') &&
    Object.prototype.hasOwnProperty.call(input, 'title') &&
    Object.prototype.hasOwnProperty.call(input, 'text')
  );
};
*/
