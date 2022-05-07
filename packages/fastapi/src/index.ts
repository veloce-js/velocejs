// fast api
import 'reflect-metadata'
// re-export
export * from './fast-api'
export * from './decorator/routes'
export * from './decorator/rest'
export * from './decorator/validator'
// re-export some of the methods that is useful here
export {
  getWriter,
  getContentType,
  lookupStatus
} from '@velocejs/server'
