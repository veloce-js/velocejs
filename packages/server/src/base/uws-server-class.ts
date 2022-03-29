// We now make it class to create the complete server
import { AppOptions, TemplatedApp } from 'uWebSockets.js'
import { createApp, shutdownServer, getPort } from './create-app'
import { UwsEndPointHandler } from './interfaces'

// main
export class UwsServer {
  port: number = 0
  private token: any = null


  constructor(private opts?: AppOptions) {}
  // overwrite the port number via the start up env
  private get portNum() {
    return process.env.PORT ? parseInt(process.env.PORT) : this.port
  }

  // this doesn't do anything just for overwrite
  public onStart() {
    console.info(`Server started on ${this.portNum}`)
  }

  // the core method
  public run(handlers: UwsEndPointHandler[]): void {
    const app: TemplatedApp = createApp(this.opts)

    if (!handlers.length) {
      throw new Error(`You must have at least 1 handler!`)
    }
    handlers.forEach(o => {
      const { type, path, handler } = o
      // @BUG if we use Reflect.apply here, uws throw a string out of bound error
      app[type](path, handler)
    })

    app.listen(this.portNum, (token: any): void => {
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
    if (this.token) {
      shutdownServer(this.token)
    } else {
      throw new Error(`No token to be found, can not gracefully shutdown`)
    }
  }

  // get the port number if it's randomly assign port
  public getPortNum(): number {
    return this.token ? getPort(this.token) : -1
  }

}
