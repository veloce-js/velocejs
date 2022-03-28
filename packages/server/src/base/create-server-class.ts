// We now make it class to create the complete server
import { AppOptions, TemplatedApp } from 'uWebSockets.js'
import { createApp, shutdownServer, getPort } from './create-app'

export interface UwsEndPointHandler {
  path: string
  handler: any
}

export default class UwsServer {
  port: number = 0
  private token: any = null

  constructor(private opts?: AppOptions) {}
  // overwrite the port number via the start up env
  private get portNum() {
    return process.env.PORT || this.port
  }

  // this doesn't do anything just for overwrite
  public onStart() {}

  // the core method
  public run(handlers: UwsEndPointHandler[]): any {
    const app: TemplatedApp = createApp(this.opts)

    if (!handlers.length) {
      throw new Error(`You must have at least 1 handler!`)
    }
    handlers.forEach(handler => {
      app[handler.path] = handler.handler
    })

    app.listen(this.portNum as number, (token: any): void => {
      if (token) {
        this.token = token
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
    return getPort(this.token)
  }

}
