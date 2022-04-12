// The key to id the meta info
export const routeKey = Symbol("FastApiRouteKey")
// put the abort method in it's own array, because it will never be async method
// and it tooks too much work to resolve them together 
export const abortFnKey = Symbol('FastApiAbortFnKey')
// for extracting argument names
export const argsKey = Symbol("FastApiArgsKey")
// for storing the ast of the file
export const astKey = Symbol("FastApiAstKey")
// for storing the validation map
export const validationKey = Symbol("FastApiValidationKey")
