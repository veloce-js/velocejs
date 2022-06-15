/*
In this version we only take the static contract files here
if you want dynamic then create a wrapper around it.
The reason is since we need to build the client side anyway
*/
import {
  JsonqlContractTemplate,
  JsonqlContractEntry,
  ArgsListType,
  GenericKeyValue,
  HttpMethod,
  HttpMethodParams,
  Whatever,
} from '../types'
import {
  WEBSOCKET_METHOD,
  DEFAULT_REQUEST_METHOD,
} from './constants'
import {
  prepareUrl
} from './common'
import { BaseClient } from './base-client'

// main
export class HttpClient extends BaseClient {

  constructor(
    contract: JsonqlContractTemplate,
    protected _httpMethod: HttpMethod,
    protected _host = ''
  ) {
    super(contract, _host)
    contract.data.forEach((entry: JsonqlContractEntry) => {
      this._mapMethod(entry)
    })
  }

  /** The one method to handle all the method calls */
  public async comm(propertyName: string, params?: Whatever[]) {
    return Reflect.apply(this[propertyName], this, params || [])
  }

  /** wrap all the construct class member in one */
  private _mapMethod(entry: JsonqlContractEntry,) {
    const { name, type } = entry
    if (type === WEBSOCKET_METHOD) {
      return // skip it
    }
    const validateFn = this._getValidatorFn(entry)
    // create the function as seen in
    // https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
    // its not amazing but at least we can see the name in console.log
    // @TODO how to pass the type info to the arguments
    this[name as string] = {
      [name as string]: async function(...args: ArgsListType[]) {
        // console.log('pass the arguments', args, 'to call', entry)
        // set validator
        return validateFn(args)
                .then((result: GenericKeyValue) =>
                  this._executeHttpCall(entry, result)
                )
    }}[name as string]
  }

  /** create the http calls, it was a private but keep having this method is declare but not read?
  warning - which stop the compiler but its read - see above!
  */
  protected _executeHttpCall(
    entry: JsonqlContractEntry,
    args: GenericKeyValue
  ) {
    const httpOpts: HttpMethodParams = {
      url: [this._host, prepareUrl(entry, args)].join('')
    }
    if (entry.type !== DEFAULT_REQUEST_METHOD)  {
      httpOpts.method = entry.type
      httpOpts.payload = args
    }
    // console.log('httpOpts', httpOpts, args)
    // now call fetch
    return this._httpMethod(httpOpts)
  }

}
