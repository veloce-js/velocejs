// WebSocket related decorator
import { websocketKey } from './keys'
import { FastApiInterface } from '../lib/fast-api-interface'
import { WEBSOCKET_ROUTE_NAME } from '@velocejs/server'
/*
  This is tricky because we normally need two methods open and message
  but we can bind to only one method at a time:
  There are two solutions I could think of

  1. Bind to an accessor method that return object that could work but it will be
    hard to bind the validation / protection to it, then again
    we could bind the input one level up and have the websocket solely as the transport layer

  2. Bind to different methoods, and we use the path to id they belongs to the same call
     but this will lead to a lot of processing and validation internally and it's hard to
     understand from reading the code what is it doing

*/
export function Socket(path: string) {

  return (
    target: FastApiInterface,
    propertyName: string
  ): void => {
    const existingWsRoutes = Reflect.getOwnMetadata(websocketKey, target) || []
    // check if the route already existed
    
    existingWsRoutes.push({
      path,
      propertyName,
      type: WEBSOCKET_ROUTE_NAME
    })

  }
}
