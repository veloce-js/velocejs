// We now make it class to create the complete server
import { AppOptions, TemplatedApp, RecognizedString, us_listen_socket } from './types'
import { UwsRouteSetup } from './base/interfaces'
import { createApp, shutdownServer, getPort } from './create-app'
import { SUPPORT_REST_ROUTES } from './base/constants'
import debug from 'debug'
const debugFn = debug(`velocejs:server:uws-server-class`)

// main
export class UwsServer {
  public autoStart = true
  public running = false
  // privates
  protected app: TemplatedApp | undefined
  // privates 
  private port = 0
  private host: RecognizedString = ''
  private token: us_listen_socket = ''

  constructor(private opts?: AppOptions) {}

  // stock start function
  private onStartFn = (url: string): void => {
    debugFn(`Server started at ${url}`)
  }

  private onStartErrorFn = (): void => {
    throw new Error(`Server could not start!`)
  }

  // Taking the app.listen out because there are more options to deal with now
  private listen(app: TemplatedApp): void {
    const cb = (token: us_listen_socket): void => {
      if (token) {
        this.token = token
        this.running = true
        this.onStartCb()
      } else {
        this.onStartErrorFn()
      }
    }
    const params: Array<RecognizedString | number | ((listenSocket: us_listen_socket) => void)> = [this.portNum, cb]
    if (this.host) {
      params.unshift(this.host)
    }

    Reflect.apply(app.listen, app, params)
  }

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
  // set a custom on start callback
  public set onStart(cb: (url: string) => void) {
    this.onStartFn = cb
  }
  // allow to pass a callback when server couldn't start
  public setOnError(cb: () => void){
    this.onStartErrorFn = cb
  }

  // this doesn't do anything just for overwrite or display a debug message
  public onStartCb() {
    const portNum = this.portNum || this.getPortNum()
    const s = this.opts ? 's' : ''
    const proto = `http${s}://`
    const hostName = this.hostName ? proto + this.hostName : `${proto}localhost`

    this.onStartFn(`${hostName}:${portNum}`)
  }

  // to init, bind handlers and then start up the UWS Server
  public run(handlers: UwsRouteSetup[]): void {
    const app = createApp(this.opts)

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
    if (this.autoStart) {
      this.listen(app)
    } else {
      this.app = app
    }
  }

  // manually start the server
  public start(): void {
    if (!this.running) {
      this.listen(this.app as TemplatedApp)
    }
  }

  // gracefully shutdown the server
  public shutdown(): void {
    if (this.running) {
      shutdownServer(this.token)
      this.running = false
    }
  }

  // get the port number if it's randomly assign port
  public getPortNum(): number {
    return this.token ? getPort(this.token) : -1
  }

}
