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
} from './types'
import { WEBSOCKET_METHOD } from './constants'
import { BaseClient } from './base-client'

// main
export class HttpClient extends BaseClient {

  constructor(
    contract: JsonqlContractTemplate,
    protected _httpMethod: HttpMethod,
    protected _host = '/'
  ) {
    super(contract, host)

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
      this[name] = {[name]: async function(...args: ArgsListType[]) {
        console.log('pass the arguments', args, 'to call', entry)
        // set validator
        return validateFn(args)
                  .then((result: GenericKeyValue) =>
                    this._executeHttpCall(entry, result)
                  )
      }}[name]
    })
  }

  /** create the http calls */
  private _executeHttpCall(
    entry: JsonqlContractEntry,
    result: GenericKeyValue
  ) {
    console.log(entry)
    console.log(result)
    // now call fetch
  }

}
