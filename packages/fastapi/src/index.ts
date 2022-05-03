// fast api
import 'reflect-metadata'
// re-export
export * from './server/fast-api'
export * from './server/rest/routes'
export * from './server/rest/rest'
export * from './server/rest/validator'
// re-export some of the methods that is useful here
export {
  getWriter,
  getContentType,
  lookupStatus
} from '@velocejs/server'
