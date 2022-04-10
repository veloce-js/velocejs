// fast api
import 'reflect-metadata'
export { FastApi } from './server/fast-api'
export {
  Raw,
  Any, Get, Post, Put, Options, Del, Patch, Head,
  Prepare, Main,
  Aborted,
  ServeStatic,
} from './server/rest/routes'
export {
  Rest
} from './server/rest/rest'
