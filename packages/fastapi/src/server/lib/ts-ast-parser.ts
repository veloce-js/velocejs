// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
import * as swc from '@swc/core'
import fs from 'fs-extra'

// wrap the swc
export async function astParser(infile: string, outdir?: string) {

  return fs.readFile(infile)
            .then((code: Buffer) => code.toString())
            .then(async (code: string) => {
              return swc
                .parse(code, {
                  syntax: "typescript", // "ecmascript" | "typescript"
                  comments: false,
                  script: true,
                  target: "es5",
                  decorators: true,
                  // Input source code are treated as module by default
                  // isModule: false,
                })
                .then((module) => (
                  // we only interested in the Class
                  // and what its define within
                  module.body.filter(body => body.type === 'ClassDeclaration')
                ))
                .then(processArgs)
            })
}

// break this out from above to processing the arguments
function processArgs(classBody: object) {
  console.dir(classBody, { depth: null })
  return classBody
}
