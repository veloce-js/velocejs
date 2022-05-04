// fast api
import 'reflect-metadata'
// re-export
export * from './fast-api'
export * from './rest/routes'
export * from './rest/rest'
export * from './rest/validator'
// re-export some of the methods that is useful here
export {
  getWriter,
  getContentType,
  lookupStatus
} from '@velocejs/server'
