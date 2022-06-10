/** the velocejs client to connect to the backend */
import type { FetchMethod, GenericKeyValue, Response } from './types'
import UrlPatternLib from 'url-pattern'
// import { ContractReader } from '@jsonql/contract/dist/reader' // @TODO
// this could be problematic if the use the config to change the url
import {
  // CONTRACT_REQUEST_METHOD,
  DEFAULT_CONTRACT_PATH,
  WEBSOCKET_METHOD,
} from './constants'
/**
  Instead of return an object contains the methods
  We call the ClientFactory to create an Client Instance that contains all
  the methods, the different is subtitle but we could pass around this Client
  instance to other places (such as another state machine or the Vue.use call)
*/
export class ClientFactory {
  private _isAppReady: Promise<GenericKeyValue>
  private _isSetupSuccess!: (value: GenericKeyValue) => void
  private _isSetupFail!: (value: Error) => void
  private _options: GenericKeyValue
  // hold all the generate methods
  public methods: GenericKeyValue = {}
  // assign the transport method on init
  constructor(
    protected _transportFn: FetchMethod,
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

  /**
    instead of create wrapper around the supply transport method
    we do this here, and it's easier to debug in a long run
    also here we will wrap around extra layer of process
  */
  protected async _fetch(
    url: string,
    method: string,
    args: GenericKeyValue,
    options?: GenericKeyValue
  ) {
    const opts = Object.assign(options || {}, {
      method,
      body: JSON.stringify(args)
    })
    return this._transportFn(url, opts)
  }

  /** The first fetch method */
  private async _getContract(): Promise<JSON> {
    return this._transportFn(
      this._options.contractUrl
    )
    .then((res: Response) => res.json() as unknown as JSON)
    // .then((json: JSON) => new ContractReader(JSON))
  }

  /** this will create the actual call method */
  private _createMethod(
    route: string,
    method: string,
    params: Array<GenericKeyValue>
  ) {
    // @TODO how to make this callable better interface
    return async (...args: GenericKeyValue[]) => {
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
        return this._fetch(route,  method, _args)
      } else {
        console.info(`@TODO setup ws connection for`, route)
      }
      return false
    }
  }

  /** put the value in the params */
  private _createArgs(
    args: GenericKeyValue[],
    params: GenericKeyValue[]
  ) {
    return params.map((param: GenericKeyValue, i: number) => (
      { [param.name]: args[i] }
    )).reduce(
      (a: GenericKeyValue, b: GenericKeyValue) => Object.assign(a,b), {}
    )
  }

  /** building the client with contract */
  public async _setup() {
    return this._getContract()
      .then((reader: GenericKeyValue) => {
        return reader.data.map((d: any) => (
          {[d.name]: this._createMethod(d.route, d.method, d.params)}
        ))
        .reduce(
          (a: GenericKeyValue, b: GenericKeyValue) => Object.assign(a,b),
          this.methods
        )
      })
  }
}
