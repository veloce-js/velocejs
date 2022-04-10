// just test the thing
// import 'reflect-metadata'
// import { Validator } from '../server/decorators/validator'

/*
function logParamTypes(target : any, key : string) {

  var t = Reflect.getMetadata("design:type", target, key);

  console.log(`--> ${key} type: ${t.name}`)

  var types = Reflect.getMetadata("design:paramtypes", target, key)

  // console.log('types', types)

  // var s = types.map(a => a.name).join()

  // console.log(`${key} param types: ${s}`)
  types.forEach(type => {
    console.log(type.toString())
  })

}
*/

//
/*
class Foo {

  @Validator()
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
*/
