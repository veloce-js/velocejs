// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
import * as swc from '@swc/core'
import fs from 'fs-extra'
// wrap the swc
export async function astParser(infile: string): Promise<object> {
  console.time('ast')
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
                .then((module) => {
                  // console.dir(module.body, { depth: null})
                  // we only interested in the Class
                  // and what its define within
                  return module
                    .body
                    .filter(body =>
                      body.type === 'ClassDeclaration'
                      ||
                      (
                        body.type === 'ExportDeclaration'
                        &&
                        body.declaration?.type === 'ClassDeclaration'
                      )
                    )
                })
                .then(normalize)
                .then(processArgs)
            })
}

// strip out to make the structure the same to work with
function normalize(body: object) {
  return body.map(code => {
    if (code.type === 'ExportDeclaration') {

      return code.declaration
    }

    return code
  })
}

// break this out from above to processing the arguments
function processArgs(classBody: object) {
  console.timeEnd('ast')
  console.dir(classBody, { depth: null })
  return classBody
}
