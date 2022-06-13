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
} from './types'
import UrlPattern from 'url-pattern'
import {
  WEBSOCKET_METHOD,
  DYNAMIC_ROUTE_PATTERN,
  DEFAULT_REQUEST_METHOD,
} from './constants'
import {
  hasArgs
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
          console.log('pass the arguments', args, 'to call', entry)
          // set validator
          return validateFn(args)
                  .then((result: GenericKeyValue) =>
                    this._executeHttpCall(entry, result)
                  )
      }}[name as string]
    })
  }

  /** create the http calls */
  private _executeHttpCall(
    entry: JsonqlContractEntry,
    args: GenericKeyValue
  ) {
    const httpOpts: HttpMethodParams = {
      url: [this._host, this._prepareUrl(entry, args)].join('')
    }
    if (entry.type !== DEFAULT_REQUEST_METHOD)  {
      httpOpts.method = entry.type
      httpOpts.payload = args
    }
    // now call fetch
    return this._httpMethod(httpOpts)
  }

  /** prepare the url */
  private _prepareUrl(
    entry: JsonqlContractEntry,
    args: GenericKeyValue
  ): string {
    const route = entry.route as string
    // handle dynamic route
    if (route.indexOf(DYNAMIC_ROUTE_PATTERN) > -1) {
      return (new UrlPattern(route)).stringify(args)
    }
    // ugly but works ...
    if (entry.method === DEFAULT_REQUEST_METHOD && hasArgs(args)) {
      const url = route + '?'
      const params: string[] = []
      for (const key in args) {
        params.push(`${key}=${args[key]}`)
      }
      return url + params.join('&')
    }
    return route
  }

  /** The one call to handle all the traffics */
  public comm(propertyName: string, params?: any[]) {
    return Reflect.apply(this[propertyName], this, params || [])
  }

}
