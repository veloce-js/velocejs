// the new Validator decorator
// import 'reflect-metadata'
// import { argsKey } from './routekey'
import { ValidationEntry } from '../../types'
import { Project, SyntaxKind } from 'ts-morph'
// import fs from 'fs-extra'
/*
Observe from the TS AST Viewer (https://ts-ast-viewer.com)
What we want to look at is
SourceFile (root)
  - ExpressionStatement
    - CallExpression
      (then here we get a bunch of Identifier which is name of the param or type)
*/
function printTree(node: any/* SourceFile */) {
  node.forEachChild( (childNode: any) => {
    console.log(childNode.getKindName())
    if (childNode.getKindName() === 'ExpressionStatement') {
      console.log('-->')
      childNode.forEachChild((grandChildNode: any) => {
        console.log(grandChildNode.getKindName())
        console.log(grandChildNode.getFullText())
      })
    }
  })
}

function travel(node: any) {
  const result = node.forEachDescendant((node: any, traversal: any) => {
    switch (node.getKind()) {
      case SyntaxKind.ClassDeclaration:
        // skips traversal of the current node's descendants
        traversal.skip()
        break;
      case SyntaxKind.Parameter:
        // skips traversal of the current node's descendants and its siblings and all their descendants
        traversal.up()
        break;
      case SyntaxKind.FunctionDeclaration:
        // stops traversal completely
        traversal.stop()
        break;
      case SyntaxKind.InterfaceDeclaration:
        // stops traversal completely and returns this value
        return node;
    }

    return undefined
  })

  console.log(result)
}


function extractNode(code: string, fileName: string) {
  const project = new Project()
  const sourceFile = project.createSourceFile(fileName, code)

  travel(sourceFile)
}


/*
@Validator([
  {
    name: 'paramName',
    rules: [

    ]
  },
])
*/
export function Validator(argMap?: Array<ValidationEntry>) {

  if (argMap) {
    console.log(argMap)
  }

  return (target: any, propertyName: string, descriptor: any): void => {

    const fn = descriptor.value
    const code = fn.toString()
    const fileName = [propertyName, 'ts'].join('.')

    extractNode(code, fileName)

    // const argTypes = Reflect.getMetadata("design:paramtypes", target, propertyName)
    // all we could get is the length and the Type (primitive not very useful)
    // const typeMap = argTypes.map(a => a.name)
    // using the reflect-metadata built-in key
    // const exisitingValidation = Reflect.getOwnMetadata(argsKey, target) || {}
    // @TODO can we do some simple validation here such as checking if the argument list match in length?
    // exisitingValidation[propertyName] = [argMap, typeMap]

    // Reflect.defineMetadata(argsKey, exisitingValidation, target)
  }
}
