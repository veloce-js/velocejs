// group all the interface(s) here for easier re-use

import { HttpResponse, HttpRequest } from 'uWebSockets.js'
import { UwsRespondBody } from '../api/type'

export type UwsRouteHandler = (res: HttpResponse, req: HttpRequest) => void

export interface UwsRouteSetup {
  type: string
  path: string
  handler: unknown //UwsRouteHandler
}

// this interface is for the result pass to the fast-api callback
// we pass the raw res and req back for other things that need to get done
export interface UwsParsedResult extends UwsRespondBody {
  res: HttpResponse,
  req: HttpRequest
}
