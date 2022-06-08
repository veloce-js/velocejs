/** the velocejs client to connect to the backend */
import type { TransportAsyncFunc, GenericKeyValue } from './types'
import UrlPatternLib from 'url-pattern'
// this could be problematic if the use the config to change the url
import {
  CONTRACT_REQUEST_METHOD,
  DEFAULT_CONTRACT_PATH,
  WEBSOCKET_METHOD,
} from './constants'

export class VeloceClient {
  private _isAppReady: Promise<GenericKeyValue>
  private _isSetupSuccess!: (value: GenericKeyValue) => void
  private _isSetupFail!: (value: Error) => void
  private _options: GenericKeyValue
  // hold all the generate methods
  public methods: GenericKeyValue = {}
  // assign the transport method on init
  constructor(
    protected _transportFn: TransportAsyncFunc,
    options?: GenericKeyValue
  ) {
    this._options = options || {
      contractUrl: DEFAULT_CONTRACT_PATH
    }
    this._isAppReady = new Promise((resolver, rejecter) => {
      this._isSetupSuccess = resolver
      this._isSetupFail = rejecter
      this._setup()
        .then(methods => {
          this._isSetupSuccess(methods)
        })
        .catch((e:Error) => {
          this._isSetupFail(e)
        })
    })
  }

  /** main method to get the methods */
  public async client() {
    return this.methods || this._isAppReady
  }

  /** The first fetch method */
  private async _getContract(): Promise<GenericKeyValue> {
    return this._transportFn(
      this._options.contractUrl,
      CONTRACT_REQUEST_METHOD
    )
  }

  /** this will create the actual call method */
  private _createMethod(
    route: string,
    method: string,
    params: Array<GenericKeyValue>
  ) {
    // @TODO how to make this callable better interface
    return async (...args: any) => {
      let _args = this._createArgs(args, params)
      if (method !== WEBSOCKET_METHOD) {
        if (route.indexOf(':') > -1) {
          const urlLib = new UrlPatternLib(route)
          route = urlLib.stringify(_args)
          // clear out the _args
          _args = {}
        }
        // when this route using the dynamic route we need to prepare it
        // new UrlPattern('/api/users(/:id)')
        return this._transportFn(route, method, _args)
      } else {
        console.info(`@TODO setup ws connection for`, route)
      }
      return false
    }
  }

  /** put the value in the params */
  private _createArgs(args: any[], params: any[]) {
    return params.map((param: any, i: number) => (
      {[param.name]: args[i]}
    )).reduce((a: any, b: any) => Object.assign(a,b), {})
  }

  /** building the client with contract */
  public async _setup() {
    return this._getContract()
      .then((reader: any) => {
        return reader.data.map((d: any) => (
          {[d.name]: this._createMethod(d.route, d.method, d.params)}
        ))
        .reduce((a: any, b: any) => Object.assign(a,b), this.methods)
      })
  }
}
