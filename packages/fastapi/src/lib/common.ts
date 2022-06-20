// dumb way to make send of the method that the decorator apply
// The problem is when you apply the decorator, it's at design time (TS)
// but it actually run on the run time (JS) so you don't really got any type info
// try the ts-morph facing the same situation. So we need to find away to
// parse the file at TS stage to extract the Type info for Validation
import type {
  RouteMetaInfo,
  // JsonqlArrayValidateInput,
  JsonqlObjectValidateInput,
  JsonqlValidationRule,
  ArgsListType,
} from '../types'
import type {
  UwsStringPairObj,
} from '@velocejs/server/index'
import {
  STATIC_TYPE,
  RAW_TYPE
} from '@velocejs/server'
import {
  SPREAD_ARG_TYPE,
  TS_TYPE_NAME,
} from '@jsonql/ast/dist/lib/constants'
import {
  DYNAMIC_ROUTE_ALLOW_TYPES,
  CLIENT_KEY,
  CLIENT_NAME,
} from './constants'
import {
  strToNum,
  strToBool,
  flatMap,
} from '@jsonql/utils'

import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:common')

// 0.103 -- this is 50% faster then regex!
export function extractArgs(fnStr: string): Array<string> {

  return fnStr.split('(')[1]
              .split(')')[0]
              .split(',')
              .map(t => t.trim())
              .filter(t => t !== '')
}

/** The validate result now comes in an object, we need to turn into array for apply */
export function prepareArgs(argList: string[], result: UwsStringPairObj) {
  return argList.map(name => result[name])
}

/*
Moving some of the smaller function out from the fastapi to reduce the complexity
*/

/** convert the string from url to the right type for dynamic route */
export function convertStrToType(
  argNames: Array<string>,
  argsList: Array<ArgsListType>,
  params: UwsStringPairObj
) {
  return argNames.map((name: string, i: number) => {
    return convertStrToTypeAction(argsList[i].type, params[name])
  })
}

/** The actual method to convert the string to their type */
export function convertStrToTypeAction(
  type: string,
  value: string
) {
  switch (type) {
    case 'number':
      return strToNum(value)
    case 'boolean':
      return strToBool(value)
    default:
      return value
  }
}

/** take the spread argument def if there is one */
export function hasSpreadArg(argsList: ArgsListType[]) {
  // you could only have one
  return argsList.filter(isSpreadFn)[0]
}

/** check if this handler is using a spread argument  */
export function isSpreadFn(list: ArgsListType) {
  // debug('list isSpreadFn', list)
  return (
    list && // spread argument?
    list[TS_TYPE_NAME] &&
    list[TS_TYPE_NAME] === SPREAD_ARG_TYPE
  )
}
/** just a loop to take the value out from the params for spread fn */
export function prepareSpreadArg(params: UwsStringPairObj) {
  const args: unknown[] = []
  for (const key in params) {
    args.push(params[key])
  }
  return args
}

/** check if the dynamic route parameter is valid or not, this throw to hail */
export function assertDynamicRouteArgs(argsList: ArgsListType[]) {
  if (argsList.filter((arg: ArgsListType) => {
    const tk = isSpreadFn(arg) ? 'types' : 'type'

    return !DYNAMIC_ROUTE_ALLOW_TYPES.includes(arg[tk] as string)
  }).length) {
    throw new Error(`We only support ${DYNAMIC_ROUTE_ALLOW_TYPES.join(',')} in dynamic route handler`)
  }
}
/** this is a mouthful! */
export function prepareArgsFromDynamicToSpread(
  argNames: Array<string>,
  argsList: Array<ArgsListType>,
  params: UwsStringPairObj,
  paramNames: string[]
) {
  debug('names', paramNames, params, paramNames)
  const processedNames: string[] = []
  const result = argsList.map((list: ArgsListType, i: number) => {
    if (isSpreadFn(list)) {
      const tmp: unknown[] = []
      paramNames.forEach((name: string) => {
        if (!processedNames.includes(name)) {
          tmp.push(convertStrToTypeAction(list.types as string, params[name]))
        }
      })
      return tmp
    } else {
      const name = argNames[i]
      processedNames.push(name)
      return params[name]
    }
  })
  return flatMap(result)
}
/** check if a value is undefined, wrapper to make the code looks cleaner */
export const notUndef = (value: unknown) => value !== undefined

// just put them all together
/** This method was in the rest.ts now move inside the FastApi class def
because we need to re-organize how to init the validation object among others
*/
export function mergeInfo(
  map: object,
  existingRoutes: Array<RouteMetaInfo>,
  validations: JsonqlObjectValidateInput,
  protectedRoutes: string[]
) {
  return existingRoutes.map(route => {
    const { propertyName, type } = route
    if (map[propertyName]) {
      route.args = map[propertyName]
    }
    route.protected = protectedRoutes && protectedRoutes.indexOf(propertyName) > -1
    route.validation = prepareValidateRoute(type, propertyName, validations)

    return route
  })
}

/** skip the static and raw type */
export function prepareValidateRoute(
  type: string,
  propertyName: string,
  validations: JsonqlObjectValidateInput,
): JsonqlValidationRule | undefined {
  if (type !== STATIC_TYPE && type !== RAW_TYPE) {
    return validations[propertyName]
  }
  return undefined
}

/** check if the client is using jsonql */
export function isJsonql(headers: UwsStringPairObj) {
  return !!(headers[CLIENT_KEY] && headers[CLIENT_KEY] === CLIENT_NAME)
}

/** when _jsonql === true then we wrap the result into this structure */
export function formatJsonql(
  payload: Partial<{ data: any, meta: any, error: any }> // @TODO import the type from jsonql/contract
) {
  return {
    data: payload.data || null,
    meta: payload.meta || null,
    error: payload.error || null
  }
}

/** check if the payload the recognizable string buffer or array buffer then convert it */
export function prepareRecognizableString(payload: any) {
  try {
    if ('byteLength' in payload) {
      return payload // Buffer of ArrayBuffer
    }
  } catch(e) {
    if (typeof payload === 'string') {
      return payload
    }
    if (typeof payload === 'object') {
      return JSON.stringify(payload)
    }
  }
}
