// dumb way to make send of the method that the decorator apply
// The problem is when you apply the decorator, it's at design time (TS)
// but it actually run on the run time (JS) so you don't really got any type info
// try the ts-morph facing the same situation. So we need to find away to
// parse the file at TS stage to extract the Type info for Validation
import type {
  UwsStringPairObj,
} from '@velocejs/server/index'
import {
  SPREAD_ARG_TYPE,
  TS_TYPE_NAME,
} from '@jsonql/constants'
import {
  strToNum,
  strToBool,
} from '@jsonql/utils'
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
export function prepareArgs(argList: string[], result: {[key: string]: any}) {
  return argList.map(name => result[name])
}

/*
Moving some of the smaller function out from the fastapi to reduce the complexity
*/

/** convert the string from url to the right type for dynamic route */
export function convertStrToType(argNames: Array<string>, params: UwsStringPairObj) {

  return argNames.map((name: string, i: number) => {
    switch (argsList[i].type) {
      case 'number':
        return strToNum(params[name])
      case 'boolean':
        return strToBool(params[name])
      default:
        return params[name]
    }
  })
}
/** */
export function isSpreadFn(al: any) {
  return (al && // spread argument?
      al[TS_TYPE_NAME] &&
      al[TS_TYPE_NAME] === SPREAD_ARG_TYPE)
}
