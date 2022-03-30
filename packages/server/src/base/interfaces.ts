// group all the interface(s) here for easier re-use

// all in one quick method to generate the server
/*
export interface HandlersInf {
  type: string,
  path: string,
  handler: (args: Array<any>) => void
} */
/* @TODO
export function fastcreateServer(opt?: AppOptions, handlers?: Array<HandlersInf>, port?: number) {
  if (!handlers.length) {
    throw new Error(`You must specify at least 1 handler`)
  }
  const app = createServer(opt)
  handlers.forEach((path, handler) => {
    app[type](path, handler)
  })

}
*/

export interface UwsRouteHandler {
  type: string
  path: string
  handler: (...args: Array<any>) => void
}
