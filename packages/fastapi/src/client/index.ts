// just test the thing
import 'reflect-metadata'

function logParamTypes(target : any, key : string) {
  var types = Reflect.getMetadata("design:paramtypes", target, key)

  console.log('types', types)

  var s = types.map(a => a.name).join()
  console.log(`${key} param types: ${s}`)

}

//

class Foo {

  @logParamTypes
  someFunc(
    params1: string,
    params2: number,
    params3?: number | boolean
  ) {
    console.log('do nothing', params1, params2, params3)
  }
}


const bar = new Foo()

bar.someFunc('a', 1)
