"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const ts_morph_1 = require("ts-morph");
// import fs from 'fs-extra'
/*
Observe from the TS AST Viewer (https://ts-ast-viewer.com)
What we want to look at is
SourceFile (root)
  - ExpressionStatement
    - CallExpression
      (then here we get a bunch of Identifier which is name of the param or type)
*/
function printTree(node /* SourceFile */) {
    node.forEachChild((childNode) => {
        console.log(childNode.getKindName());
        if (childNode.getKindName() === 'ExpressionStatement') {
            console.log('-->');
            childNode.forEachChild((grandChildNode) => {
                console.log(grandChildNode.getKindName());
                console.log(grandChildNode.getFullText());
            });
        }
    });
}
function travel(node) {
    const result = node.forEachDescendant((node, traversal) => {
        switch (node.getKind()) {
            case ts_morph_1.SyntaxKind.ClassDeclaration:
                // skips traversal of the current node's descendants
                traversal.skip();
                break;
            case ts_morph_1.SyntaxKind.Parameter:
                // skips traversal of the current node's descendants and its siblings and all their descendants
                traversal.up();
                break;
            case ts_morph_1.SyntaxKind.FunctionDeclaration:
                // stops traversal completely
                traversal.stop();
                break;
            case ts_morph_1.SyntaxKind.InterfaceDeclaration:
                // stops traversal completely and returns this value
                return node;
        }
        return undefined;
    });
    console.log(result);
}
function extractNode(code, fileName) {
    const project = new ts_morph_1.Project();
    const sourceFile = project.createSourceFile(fileName, code);
    travel(sourceFile);
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
function Validator(argMap) {
    if (argMap) {
        console.log(argMap);
    }
    return (target, propertyName, descriptor) => {
        const fn = descriptor.value;
        const code = fn.toString();
        const fileName = [propertyName, 'ts'].join('.');
        extractNode(code, fileName);
        // const argTypes = Reflect.getMetadata("design:paramtypes", target, propertyName)
        // all we could get is the length and the Type (primitive not very useful)
        // const typeMap = argTypes.map(a => a.name)
        // using the reflect-metadata built-in key
        // const exisitingValidation = Reflect.getOwnMetadata(argsKey, target) || {}
        // @TODO can we do some simple validation here such as checking if the argument list match in length?
        // exisitingValidation[propertyName] = [argMap, typeMap]
        // Reflect.defineMetadata(argsKey, exisitingValidation, target)
    };
}
exports.Validator = Validator;
