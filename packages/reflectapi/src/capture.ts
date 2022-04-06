/*eslint no-case-declarations: 0*/
// main capture the AST of a class method
import {
  Project,
  SyntaxKind
} from 'ts-morph'
// import fs from 'fs-extra'
/*
Observe from the TS AST Viewer (https://ts-ast-viewer.com)
What we want to look at is
SourceFile (root)
  - ExpressionStatement
    - CallExpression
      (then here we get a bunch of Identifier which is name of the param or type)
*/
function getTree(node: any/* SourceFile */, astMap: any) {

  console.log(node.getKindName())

  node.forEachChild( (childNode: any) => {
    console.log('--->', childNode.getKindName())

    switch (childNode.getKindName()) {
      case 'ExpressionStatement':
        astMap.ExpressionStatement = {}
        /* completely useless
        const espNode1 = childNode.getExpression()
        const typeArgs = espNode1.getTypeArguments()
        console.log('typeArgs', typeArgs)
        typeArgs.forEach(arg => {
          console.log(arg.getType())
        })
        */
        astMap = getTree(childNode, astMap)
        break
      case 'CallExpression':
        const espNode = childNode.getExpression()
        /* return empty
        const typeArgs = childNode.getTypeArguments()
        console.log('typeArgs', typeArgs)
        typeArgs.forEach(arg => {
          console.log(arg.getType())
        })
        */
        astMap.ExpressionStatement = {
          fnText: childNode.getFullText(),
          name: espNode.getFullText(),
          params: []
        }
        astMap = getTree(childNode, astMap)

        break
      case 'Identifier':
        astMap.ExpressionStatement.params.push(childNode.getText())
        // it just return any
        // console.log('Type', childNode.getType().getText())
        // const definitions = childNode.getDefinitions()
        // console.log(definitions)
        break
      default:
        // do nothing
    }
  })

  return astMap
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
        console.log('parameters?', node)
        break;
      case SyntaxKind.FunctionDeclaration:
        // stops traversal completely
        traversal.stop()

        console.log(node.getExpression().getFullText())

        break;
      case SyntaxKind.InterfaceDeclaration:
        // stops traversal completely and returns this value
        return node;
    }

    return undefined
  })

  console.log(result)
}


let indent = 0;

function printTree(node) {
    console.log(new Array(indent + 1).join(' ') + node.getKindName());
    indent++;
    node.forEachChild(printTree);
    indent--;
}


// The main interface to use inside the Decorator
export function extractNode(code: string, fileName: string) {
  const project = new Project()
  const sourceFile = project.createSourceFile(
    [fileName, 'ts'].join('.'),
    code
  )

  sourceFile.forEachChild( (childNode: any) => {
    travel(childNode)
  })

  /*
  printTree(sourceFile)

  console.log('-------------------------------------------------------------')

  const astMap = getTree(sourceFile, {})

  console.log(astMap)
  */
}
