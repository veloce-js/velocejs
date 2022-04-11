// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
import swc from '@swc/core'
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
                  // Input source code are treated as module by default
                  // isModule: false,
                })
                .then((module) => {
                  console.log(module.type) // file type
                  console.log(module.body) // AST

                  return module.body
                })
            })

}
