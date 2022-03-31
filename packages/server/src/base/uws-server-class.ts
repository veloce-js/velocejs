// We now make it class to create the complete server
import { AppOptions, TemplatedApp, us_listen_socket } from 'uWebSockets.js'
import { createApp, shutdownServer, getPort } from './create-app'
import { UwsRouteHandler } from './interfaces'
import { SUPPORT_REST_ROUTES } from './constants'
import debug from 'debug'
// construct the debug fn
const debugFn = debug(`velocejs:server:uws-server-class`)

// main
export class UwsServer {
  private port = 0
  private token: us_listen_socket
  
  constructor(private opts?: AppOptions) {}
  // overwrite the port number via the start up env
  public get portNum() {
    return process.env.PORT ? parseInt(process.env.PORT) : this.port
  }

  public set portNum(port: number) {
    this.port = port
  }

  // this doesn't do anything just for overwrite
  public onStart() {
    debugFn(`Server started on ${this.portNum}`)
  }

  // the core method
  public run(handlers: UwsRouteHandler[]): void {
    const app: TemplatedApp = createApp(this.opts)

    if (!handlers.length) {
      throw new Error(`You must have at least 1 handler!`)
    }

    handlers.forEach(o => {
      const { type, path, handler } = o
      // @BUG if we use Reflect.apply here, uws throw a string out of bound error
      if (SUPPORT_REST_ROUTES.includes(type)) {
        app[type](path, handler)
      } else {
        throw new Error(`Route ${type} is not supported!`)
      }
    })

    app.listen(this.portNum, (token: us_listen_socket): void => {
      if (token) {
        this.token = token
        this.onStart()
      } else {
        throw new Error(`Server could not start!`)
      }
    })
  }

  // gracefully shutdown the server
  public shutdown(): void {
    shutdownServer(this.token)
  }

  // get the port number if it's randomly assign port
  public getPortNum(): number {
    return this.token ? getPort(this.token) : -1
  }

}
