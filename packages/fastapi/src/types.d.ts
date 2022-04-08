/// TBC
export type ValidationRule = {
  type: string
}

export type ValidationEntry = {
  name: string // now its required
  required?: boolean // true by default
  rules: any[]
}
// move from @velocejs/server
export type RouteMetaInfo = {
  propertyName: string
  path: string
  type: string
  onAbortedHandler?: string
  [key: string]: any // so we can store more info if we need to
}

export type MetaDecorator = (path: string) => (target: any, propertyName: string) => void
