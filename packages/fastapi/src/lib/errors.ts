// we subclass the JsonqlErrors and create our VeloceError here
import { JsonqlError } from '@jsonql/errors'

export class VeloceError extends JsonqlError {

  constructor(message?: string, details?: any) {
    super(message, details)
    // @TODO fix the className
  }
}


export class VeloceValidationError extends JsonqlError {

  constructor(message?: string, details?: any) {
    super(message, details)
    // @TODO fix the className
  }
}