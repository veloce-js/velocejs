"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationKey = exports.astKey = exports.argsKey = exports.abortFnKey = exports.routeKey = void 0;
// The key to id the meta info
exports.routeKey = Symbol("FastApiRouteKey");
// put the abort method in it's own array, because it will never be async method
// and it tooks too much work to resolve them together
exports.abortFnKey = Symbol('FastApiAbortFnKey');
// for extracting argument names
exports.argsKey = Symbol("FastApiArgsKey");
// for storing the ast of the file
exports.astKey = Symbol("FastApiAstKey");
// for storing the validation map
exports.validationKey = Symbol("FastApiValidationKey");
