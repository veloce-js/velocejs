/** the velocejs client to connect to the backend */
import { TransportAsyncFunc, GenericKeyValue } from './types'
// this could be problematic if the use the config to change the url
import {
  VELOCE_DEFAULT_URL,
  CONTRACT_KEY
} from '@velocejs/config'
import {
  JsonqlContractReader,
  CONTRACT_REQUEST_METHODS
} from '@jsonql/contract'

export class VeloceClient {
  private _options: GenericKeyValue
  // hold all the generate methods
  public methods = {}
  // assign the transport method on init
  constructor(protected _transportFn: TransportAsyncFunc, options?: GenericKeyValue) {
    this._options = options || {
      host: '/',
      contractUrl: `${VELOCE_DEFAULT_URL}/${CONTRACT_KEY}`
    }
  }

  /** The first fetch method */
  private async _getContract(): Promise<JsonqlContractReader> {
    return this._transportFn(
      this._options.host + this._options.contractUrl,
      CONTRACT_REQUEST_METHODS[0]
    )
    .then(json => (
      new JsonqlContractReader(json)
    ))
  }

  /** this will create the actual call method */
  private _createMethod(
    route: string,
    method: string,
    params: Array<GenericKeyValue>
  ) {
    // @TODO use the new Function method to generate with name params?
    return (...args: any) => {

      this._transportFn(route, method, this._createArgs(args, params))
    }
  }

  /** put the value in the params */
  private _createArgs(args: any[], params: any[]) {
    return params.map((param: any, i: number) => (
      {[param.name]: args[i]}
    )).reduce((a: any, b: any) => Object.assign(a,b), {})
  }

  /** building the client with contract */
  public async build() {
    return this._getContract()
      .then((reader: JsonqlContractReader) => {
        const data = reader.data()
        return data.map((d: any) => (
          {[d.name]: this._createMethod(d.route, d.method, d.params)}
        ))
        .reduce((a: any, b: any) => Object.assign(a,b), this.methods)
      })
  }
}
