// not a ava test for dev only
import 'reflect-metadata'
import { extractNode } from '../src/capture'

function Validator(config?: object) {

  return (source: any, propertyName: string, descriptor: any) => {
    const code = descriptor.value.toString()
    extractNode(code, propertyName)
  }
}


class SomeClass {

  // to make it as messy as possible
  @Validator()
  someFunc (a: string,     b: number|boolean,   d?: string | number, x?: any): object {
    let obj: Object = {a, b}
    if (d) {
      obj = Object.assign(obj, { d })
    }
    console.log(x)
    return obj
  }
}

const sc = new SomeClass()

const result = sc.someFunc('hello', 1)

console.log(result)
