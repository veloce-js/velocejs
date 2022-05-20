// dumb way to make send of the method that the decorator apply
// The problem is when you apply the decorator, it's at design time (TS)
// but it actually run on the run time (JS) so you don't really got any type info
// try the ts-morph facing the same situation. So we need to find away to
// parse the file at TS stage to extract the Type info for Validation
import type {
  UwsStringPairObj,
} from '@velocejs/server/index'
import type {
  RouteMetaInfo,
} from '../types'
import {
  SPREAD_ARG_TYPE,
  TS_TYPE_NAME,
} from '@jsonql/constants'
import {
  DYNAMIC_ROUTE_ALLOW_TYPES
} from './constants'
import {
  strToNum,
  strToBool,
} from '@jsonql/utils'

import debugFn from 'debug'
const debug = debugFn('velocejs:fastapi:common')

// ugly but simple and it works
export function extractArgs(fnStr: string): Array<string> {

  return splitMethod(fnStr)
}

// 0.103 -- this is 50% faster then regex!
function splitMethod(fnStr: string): Array<string> {

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
  argsList: Array<UwsStringPairObj>,
  params: UwsStringPairObj
) {

  return argNames.map((name: string, i: number) => {
    const value = params[name]
    switch (argsList[i].type) {
      case 'number':
        return strToNum(value)
      case 'boolean':
        return strToBool(value)
      default:
        return value
    }
  })
}

/** take the spread argument def if there is one */
export function hasSpreadArg(argsList: UwsStringPairObj[]) {
  // you could only have one
  return argsList.filter(isSpreadFn)[0]
}

/** check if this handler is using a spread argument  */
export function isSpreadFn(list: UwsStringPairObj) {
  // debug('list isSpreadFn', list)
  return (
    list && // spread argument?
    list[TS_TYPE_NAME] &&
    list[TS_TYPE_NAME] === SPREAD_ARG_TYPE
  )
}
/** just a loop to take the value out from the params for spread fn */
export function prepareSpreadArg(params: UwsStringPairObj) {
  const args: any[] = []
  for (const key in params) {
    args.push(params[key])
  }
  return args
}

/** check if the dynamic route parameter is valid or not, this throw to hail */
export function assertDynamicRouteArgs(argsList: UwsStringPairObj[]) {
  if (argsList.filter((arg: UwsStringPairObj) => {
    const tk = isSpreadFn(arg) ? 'types' : 'type'

    return !DYNAMIC_ROUTE_ALLOW_TYPES.includes(arg[tk])
  }).length) {
    throw new Error(`We only support ${DYNAMIC_ROUTE_ALLOW_TYPES.join(',')} in dynamic route handler`)
  }
}
/** this is a mouthful! */
export function prepareArgsFromDynamicToSpread(
  argNames: Array<string>,
  argsList: Array<UwsStringPairObj>,
  params: UwsStringPairObj
) {

  debug(argNames)
  debug(argsList)
  debug(params)
  const processedNames: string[] = []
  const result = argList.map((list: UwsStringPairObj, i: number) => {
    if (isSpreadFn(list)) {
      const type = list.types
      for (const key in params) {
        if (!processedNames.includes(key)) {
          // @TODO there is one problem the object is not in order!
          
        }
      }
    } else {
      const name = argNames[i]
      return params[name]
    }
  })
}


export const notUndef = (value: any) => value !== undefined