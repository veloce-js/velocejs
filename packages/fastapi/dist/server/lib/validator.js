"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numAlias = exports.strAlias = exports.createValidator = exports.createDescriptor = void 0;
// using the async-validator https://github.com/yiminghe/async-validator/
// import Schema from 'async-validator'
/*
Here is the design idea:
1. Using the JSON Schema validation rules and keywords
2. Allow overwrite the type (type are extract automatially from their typescript expression)
3. keyword validation such as pattern: EMAIL
4. For rules that use the validator (sync) or asyncValidator or mark with 'server': true will be server side only
5. If they pass the rules as an object then the field name expect to be key
6. if they pass as an array, then we map it with the same order as in their argument list
7. when validation failed we return a 417 status or the dev can override it per route or globally
*/
function createDescriptor(argNames, validationInput) {
    console.log(argNames);
    console.dir(validationInput, { depth: null });
    return validationInput;
}
exports.createDescriptor = createDescriptor;
// this will get call inside the FastApi
function createValidator(argNames, validationInput) {
    // const descriptor = createDescriptor(argNames, validationInput)
    // const validator = new Schema(descriptor)
    // we just return the actual fn
    // return validator.validate
    // return a dummy for now
    return (...args) => Promise.resolve(args);
}
exports.createValidator = createValidator;
// Map the alias to our json schema
exports.strAlias = {
    max: 'maxLength',
    '<=': 'maxLength',
    min: 'minLength',
    '>=': 'minLength'
};
exports.numAlias = Object.assign(exports.strAlias, {
    less: 'exclusiveMaxmimum',
    '<': 'exclusiveMaxmimum',
    greater: 'exclusiveMinimum',
    '>': 'exclusiveMinimum'
});
