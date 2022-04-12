// dumb way to make send of the method that the decorator apply
// The problem is when you apply the decorator, it's at design time (TS)
// but it actually run on the run time (JS) so you don't really got any type info
// try the ts-morph facing the same situation. So we need to find away to
// parse the file at TS stage to extract the Type info for Validation

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
/*
function regexMethod(fnStr: string): Array<string> {
  // 0.156ms
  try {
    console.time(`regex`)
    const parts = fnStr.match(/\(([\s\S]*)\)/gm)
    if (parts && parts[0]) {

      return parts[0]
              .replace('(', '')
              .replace(')', '')
              .split(',')
              .map(s => s.trim())
    }

    return []
  } catch(e) {
    console.error(e)
  } finally {
    console.timeEnd(`regex`)
  }
} */