// move from @velocejs/server

export type {
  AppOptions,
  WebSocket,
  HttpResponse,
  HttpRequest,
  UwsRouteSetup,
  UwsRouteHandler,
  UwsRespondBody,
  UwsStringPairObj,
  RecognizedString,
} from '@velocejs/server/index'
export type {
  JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlValidationRule,
  JsonqlValidationPlugin,
  MixedValidationInput,
} from '@jsonql/validator/index'
import type {
  UwsBodyParserOptions
} from '@velocejs/bodyparser/index'
export type {
  JsonqlContractTemplate
} from '@jsonql/contract/index'

export type RouteMetaInfo = {
  type: string
  propertyName: string
  path: string
  excluded?: boolean // exclude this from contract
  // onAbortedHandler?: string this is deprectead
  protected?: boolean
  validation?: JsonqlArrayValidateInput | JsonqlObjectValidateInput
  route?: string
  [key: string]: any // This has to be any for now because the stupid type TS compiler took the wrong key?
}
// this is totally pointless
export type MetaDecorator = (path: string) => (target: unknown, propertyName: string, descriptor: unknown) => void

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

export type ArgsListType = {
  name: string
  required: boolean
  type: string
  tstype?: string
  types?: string
  typeParams?: unknown
}

export * from './lib/validate-types'
// just stub this for now
export type VeloceCtx = {
  propertyName: string
  [key: string]: unknown
} & UwsRespondBody

export type VeloceMiddleware = (ctx: VeloceCtx) => Promise<VeloceCtx>

export type BodyParserConfig = {
  config: UwsBodyParserOptions,
  onAborted?: () => void
}

export type ValidateFn = (values: Array<unknown>) => Promise<Array<unknown>>

export type ValidatorsInstance = {
  validate: ValidateFn
  addValidationRules: (rules: JsonqlObjectValidateInput) => void
}

export type DynamicRouteCheckFn = (t: string, p: string, args: ArgsListType[]) => string

export type { MixedValidationInput }
