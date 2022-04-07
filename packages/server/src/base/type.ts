// take the type out to avoid a circular reference
// just to type the damn thing to stop the warning
// string to string object with unknown properties
export type StringPairObj = {
  [key: string]: string
}

export type RouteMetaInfo = {
  propertyName: string
  path: string
  type: string
  onAbortedHandler?: string
  [key: string]: any // so we can store more info if we need to
}

export type MetaDecorator = (path: string) => (target: any, propertyName: string) => void

// Typing the result object
export type UwsRespondBody = {
  url: string
  method: string
  query: string,
  headers: StringPairObj
  params: any,
  payload?: any
}
