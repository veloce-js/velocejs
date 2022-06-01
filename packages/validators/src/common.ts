/**
  when we take the plugin defintion file with the main method
  sometime it could be
  main(value) {}
  which is unusable out of it's context therefore we need to transform it
*/

export function transformMainFn(fnStr: string) {
  // very dummy way
  const target = 'main('
  if (fnStr.indexOf(target) > -1) {
    return fnStr.replace(target, 'function(')
  }
  return fnStr
}
