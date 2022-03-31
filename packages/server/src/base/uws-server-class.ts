// We now make it class to create the complete server
import { AppOptions, TemplatedApp, RecognizedString, us_listen_socket } from 'uWebSockets.js'
import { createApp, shutdownServer, getPort } from './create-app'
import { UwsRouteSetup } from './interfaces'
import { SUPPORT_REST_ROUTES } from './constants'
import debug from 'debug'
// construct the debug fn
const debugFn = debug(`velocejs:server:uws-server-class`)

// main
export class UwsServer {
  private port = 0
  private host: RecognizedString = ''
  private token: us_listen_socket = ''

  constructor(private opts?: AppOptions) {}
  // overwrite the port number via the start up env
  public get portNum() {
    const p = process.env.PORT

    return p ? parseInt(p) : this.port
  }
  // setter for post number
  public set portNum(port: number) {
    this.port = port
  }
  // we could specify the host like 0.0.0.0
  // listen(host: RecognizedString, port: number, cb: (listenSocket: us_listen_socket) => void): TemplatedApp;
  public get hostName() {
    const h = process.env.HOST

    return h ? h : this.host
  }
  // setter for host name
  public set hostName(host: RecognizedString) {
    this.host = host
  }

  // this doesn't do anything just for overwrite
  public onStart() {
    const portNum = this.portNum || this.getPortNum()
    const s = this.opts ? 's' : ''
    const proto = `http${s}://`
    const hostName = proto + this.hostName || `${proto}localhost`

    debugFn(`Server started on ${hostName}:${portNum}`)
  }

  // the core method
  public run(handlers: UwsRouteSetup[]): void {
    const app: TemplatedApp = createApp(this.opts)

    if (!handlers.length) {
      throw new Error(`You must have at least 1 handler!`)
    }

    handlers.forEach(o => {
      const { type, path, handler } = o
      // @BUG if we use Reflect.apply here, uws throw a string out of bound error
      if (SUPPORT_REST_ROUTES.includes(type)) {
        debugFn(`Create ${type} route for ${path}`)
        app[type](path, handler)
      } else {
        throw new Error(`Route ${type} is not supported!`)
      }
    })
    // run it
    this.listen(app)
  }

  // Taking the app.listen out because there are more options to deal with now
  private listen(app: TemplatedApp): void {
    const cb = (token: us_listen_socket): void => {
      if (token) {
        this.token = token
        this.onStart()
      } else {
        throw new Error(`Server could not start!`)
      }
    }
    const params: any[] = [this.portNum, cb]
    if (this.host) {
      params.unshift(this.host)
    }

    Reflect.apply(app.listen, app, params)
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
