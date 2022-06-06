// start your project here
import type {
  UwsStringPairObj,
  JsonqlRouteForContract,
} from './types'
import {
  Validators
} from '@velocejs/validators/dist/validators-server'
import {
  JsonqlContractWriter
} from '@jsonql/contract'
// main
export class Contract extends JsonqlContractWriter {

  constructor(
    routeForContract: JsonqlRouteForContract,
    private _validators?: Validators
  ) {
    super(routeForContract)
  }

  /** this is use in fastapi._`prepareRouteForContract */
  static formatRoute(
    propertyName: string,
    args: UwsStringPairObj[],
    type: string,
    path: string,
  ) {
    return {
      name: propertyName,
      params: args,
      method: type,
      route: path
    }
  }

  /** output the contract without write */
  public generate() {
    if (this._validators) {
      const { schema, plugins } = this._validators.exportAll()
      console.dir( schema, { depth: null })
      this.appendValidations( schema, plugins )
    }
    // at this point should be the final call
    const contract = this.output()

    return contract
  }
}
