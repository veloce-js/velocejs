// fast api
import 'reflect-metadata'
export { FastApi } from './server/fast-api'
export {
  RAW,
  ANY, GET, POST, PUT, OPTIONS, DEL, PATCH, HEAD,
  PREPARE,
  ABORTED,
  SERVE_STATIC
} from './server/decorators/index'
