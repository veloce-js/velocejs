// dumb way to make send of the method that the decorator apply
// The problem is when you apply the decorator, it's at design time (TS)
// but it actually run on the run time (JS) so you don't really got any type info
// try the ts-morph facing the same situation. So we need to find away to
// parse the file at TS stage to extract the Type info for Validation

// ugly but simple and it works
export function extractArgs(fnStr: string): Array<string> {
  // @TODO replace this with a regex 
  const part1 = fnStr.split('(')
  const part2 = part1[1].split(')')
  const part3 = part2[0].split(',')

  return part3.map(t => t.trim()).filter(t => t !== '')
}
