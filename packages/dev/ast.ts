// the reflect-meta is pretty useless to capture the method params
// no name and just bunch of primitive useless stuff
// so we need to figure out using an ast parser to actually parse
// the method and get back the list of param names

import * as ts from 'typescript'
import * as fs from 'fs'

var cmd = ts.parseCommandLine(['./client/index.ts']); // replace with target file
// Create the program
let program = ts.createProgram(cmd.fileNames, cmd.options);


type ObjectDictionary = { [key: string]: string | ObjectDictionary}
function extractAllObjects(program: ts.Program, file: ts.SourceFile): ObjectDictionary {
    let empty = ()=> {};
    // Dummy transformation context
    let context: ts.TransformationContext = {
        startLexicalEnvironment: empty,
        suspendLexicalEnvironment: empty,
        resumeLexicalEnvironment: empty,
        endLexicalEnvironment: ()=> [],
        getCompilerOptions: ()=> program.getCompilerOptions(),
        hoistFunctionDeclaration: empty,
        hoistVariableDeclaration: empty,
        readEmitHelpers: ()=>undefined,
        requestEmitHelper: empty,
        enableEmitNotification: empty,
        enableSubstitution: empty,
        isEmitNotificationEnabled: ()=> false,
        isSubstitutionEnabled: ()=> false,
        onEmitNode: empty,
        onSubstituteNode: (hint, node)=>node,
    };
    let typeChecker =  program.getTypeChecker();

    function extractObject(node: ts.ObjectLiteralExpression): ObjectDictionary {
        var result : ObjectDictionary = {};
        for(let propDeclaration of node.properties){
            if(!ts.isPropertyAssignment( propDeclaration )) continue;
            const propName = propDeclaration.name.getText()
            if(!propName) continue;
            if(ts.isObjectLiteralExpression(propDeclaration.initializer)) {
                result[propName] = extractObject(propDeclaration.initializer);
            }else{
                result[propName] = propDeclaration.initializer.getFullText()
            }
        }
        return result;
    }
    let foundVariables: ObjectDictionary = {};
    function visit(node: ts.Node, context: ts.TransformationContext): ts.Node {
        if(ts.isVariableDeclarationList(node)) {
            let triviaWidth = node.getLeadingTriviaWidth()
            let sourceText = node.getSourceFile().text;
            let trivia = sourceText.substr(node.getFullStart(), triviaWidth);
            if(trivia.indexOf("Generate_Union") != -1) // Will generate fro variables with a comment Generate_Union above them
            {
                for(let declaration of node.declarations) {
                    if(declaration.initializer && ts.isObjectLiteralExpression(declaration.initializer)){
                        foundVariables[declaration.name.getText()] = extractObject(declaration.initializer)
                    }
                }
            }
        }
        return ts.visitEachChild(node, child => visit(child, context), context);
    }
    ts.visitEachChild(file, child => visit(child, context), context);
    return foundVariables;
}



let result = extractAllObjects(program, program.getSourceFile("test.ts")!); // replace with file name

function generateUnions(dic: ObjectDictionary) {
    function toPaths(dic: ObjectDictionary) : string[] {
        let result: string[] = []
        function extractPath(parent: string, object: ObjectDictionary) {
            for (const key of  Object.keys(object)) {
                let value = object[key];
                if(typeof value === "string") {
                    result.push(parent + key);
                }else{
                    extractPath(key + ".", value);
                }
            }
        }
        extractPath("", dic);
        return result;
    }

    return Object.entries(dic)
        .map(([name, values])=>
        {
            let paths = toPaths(values as ObjectDictionary)
                .map(ts.createStringLiteral)
                .map(ts.createLiteralTypeNode);

            let unionType = ts.createUnionTypeNode(paths);
            return ts.createTypeAliasDeclaration(undefined, undefined, name + "Paths", undefined, unionType);
        })

}

var source = ts.createSourceFile("d.ts", "", ts.ScriptTarget.ES2015);
source = ts.updateSourceFileNode(source, generateUnions(result));

var printer = ts.createPrinter({ });
let r = printer.printFile(source);
fs.writeFileSync("union.ts", r);
