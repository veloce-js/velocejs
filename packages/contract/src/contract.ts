// start your project here
import type {
  VeloceAstMap,
  // MixedValidationInput,
} from '@velocejs/validators/index'
import {
  Validators
} from '@velocejs/validators'
import {
  JsonqlContractWriter
} from '@jsonql/contract'

export class Contract extends JsonqlContractWriter {

  constructor(
    astMap: VeloceAstMap,
    private _validators: Validators
  ) {
    super(astMap)
  }

  public generate() {
    const { schema } = this._validators.export()
  // console.dir( schema, { depth: null })

    this.appendValidations( schema )
    // at this point should be the final call
    const contract = this.output()

    return contract
  }

}
