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

export * from './server/lib/validator-types'
