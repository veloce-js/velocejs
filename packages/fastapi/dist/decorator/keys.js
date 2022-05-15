"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedKey = exports.validationKey = exports.abortFnKey = exports.routeKey = void 0;
// The key to id the meta info
exports.routeKey = Symbol('FastApiRouteKey');
// put the abort method in it's own array, because it will never be async method
// and it tooks too much work to resolve them together
exports.abortFnKey = Symbol('FastApiAbortFnKey');
// for storing the validation map
exports.validationKey = Symbol('FastApiValidationKey');
// protected route
exports.protectedKey = Symbol('FastApiProtectedKey');
// for extracting argument names
// export const argsKey = Symbol("FastApiArgsKey")
// for storing the ast of the file
// export const astKey = Symbol("FastApiAstKey")
