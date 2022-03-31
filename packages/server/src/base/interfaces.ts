// group all the interface(s) here for easier re-use

import { HttpResponse, HttpRequest } from 'uWebSockets.js'

export type UwsRouteHandler = (res: HttpResponse, req: HttpRequest) => void

export interface UwsRouteSetup {
  type: string
  path: string
  handler: UwsRouteHandler
}
// string to string object with unknown properties 
export type StringPairObj = {
  [key: string]: string
}

// Typing the result object
export type RespondBody = {
  url: string
  method: string
  query: string,
  headers: StringPairObj
  params: any,
  payload?: any
}
// this interface is for the result pass to the fast-api callback
// we pass the raw res and req back for other things that need to get done
export interface ParsedResult extends RespondBody {
  res: HttpResponse,
  req: HttpRequest
}
