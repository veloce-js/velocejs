"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// just test the thing
require("reflect-metadata");
const validator_1 = require("../server/decorators/validator");
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
class Foo {
    someFunc(params1, params2, params3) {
        console.log('do nothing', params1, params2, params3);
    }
}
tslib_1.__decorate([
    (0, validator_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], Foo.prototype, "someFunc", null);
const bar = new Foo();
bar.someFunc('a', 1);
