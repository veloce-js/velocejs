// we subclass the JsonqlErrors and create our VeloceError here
import { JsonqlError } from '@jsonql/errors'

export class VeloceErrors extends JsonqlError {

  constructor(message: string, details: any) {
    super(message, details)
  }
}
