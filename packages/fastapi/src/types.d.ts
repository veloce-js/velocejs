// move from @velocejs/server

export type {
  AppOptions,
  WebSocket,
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  UwsRespondBody,
  // UwsWriter,
  // UwsJsonWriter,
  UwsStringPairObj,
  RecognizedString,
} from '@velocejs/server/index'
export type {
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
} from '@jsonql/validator/index'

export type RouteMetaInfo = {
  propertyName: string
  path: string
  type: string
  excluded?: boolean // exclude this from contract
  // onAbortedHandler?: string this is deprectead
  protected?: boolean
  validation?: JsonqlArrayValidateInput | JsonqlObjectValidateInput
  [key: string]: any // so we can store more info if we need to @TODO remove this once it's stable
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
  excluded?: boolean
  routeType?: string
}
/*
export type ArgsListType = {
  name: string
  required: boolean
  type: string
  tstype?: string
  types?: string
  typeParams?: any
}
*/

export * from './lib/validate-types'
// just stub this for now
export type VeloceCtx = {
  propertyName: string
  [key: string]: any
} & UwsRespondBody

export type VeloceMiddleware = (ctx: VeloceCtx) => Promise<VeloceCtx>
