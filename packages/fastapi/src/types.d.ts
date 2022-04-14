// move from @velocejs/server
export type RouteMetaInfo = {
  propertyName: string
  path: string
  type: string
  onAbortedHandler?: string
  [key: string]: any // so we can store more info if we need to
}
// this is totally pointless
export type MetaDecorator = (path: string) => (target: any, propertyName: string, descriptor: any) => void

export type DescriptorMeta = {
  value: function
  writable: boolean
  enumerable: boolean
  configurable: boolean
}
// we might add more options in the future
export type RouteOptions = {
  protected?: boolean
}

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

export type JsonValidationOption = {
  status?: number
}
