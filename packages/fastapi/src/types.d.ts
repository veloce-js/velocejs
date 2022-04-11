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
// @TODO
export type JsonValidateStringRule = {
  type: string
}
export type JsonValidateNumberRule = {
  type: string
}
export type JsonValidateArrayRule = {
  type: string
}
export type JsonValidateObjectRule = {
  type: string
}
export type JsonValidateAnyRule = {
  type: string
}
// Validation Type - using the JSON Schema Validation standard
export type JsonValidationEntry = {
  index?: number
  name?: string
  type?: string
  required?: boolean
  rules?: Array<
    JsonValidateStringRule |
    JsonValidateNumberRule |
    JsonValidateArrayRule |
    JsonValidateObjectRule |
    JsonValidateAnyRule> // @TODO the object will be futher specify
}
