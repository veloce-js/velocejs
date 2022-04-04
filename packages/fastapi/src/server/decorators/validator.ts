// the new Validator decorator
// import 'reflect-metadata'
import { argsKey } from './routekey'

function Validator() {

  return (target: any, propertyName: string, descriptor: any) => {
    // using the reflect-metadata built-in key
    const types = Reflect.getMetadata("design:paramtypes", target, propertyName)
    // take this apart then store the valiator rules for use later
    // @TODO figure out how to generate a contract via this setup

    

  }
}
