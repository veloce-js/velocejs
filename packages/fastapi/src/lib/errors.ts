// we subclass the JsonqlErrors and create our VeloceError here
import JsonqlError from '@jsonql/errors/dist/error'

export class VeloceError extends JsonqlError {


  constructor(...args: unknown[]) {
    super(...args)

    this.className = VeloceError.name

  }
}
