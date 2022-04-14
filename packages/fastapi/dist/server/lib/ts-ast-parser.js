"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astParser = void 0;
const tslib_1 = require("tslib");
// Using the swc/core to parse the TS file into AST
// and we extract the method's argument along with their type
// for validation
const swc = tslib_1.__importStar(require("@swc/core"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const constants_1 = require("../../constants");
// wrap the swc
async function astParser(infile) {
    console.time('ast');
    return fs_extra_1.default.readFile(infile)
        .then((code) => code.toString())
        .then(async (code) => {
        return swc
            .parse(code, {
            syntax: "typescript",
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
                .filter(body => body.type === 'ClassDeclaration'
                ||
                    (body.type === 'ExportDeclaration'
                        &&
                            body.declaration?.type === 'ClassDeclaration'));
        })
            .then(normalize)
            .then(processArgs);
    });
}
exports.astParser = astParser;
// strip out to make the structure the same to work with
function normalize(body) {
    if (body.length) {
        return body.map(code => {
            if (code.type === 'ExportDeclaration') {
                return code.declaration;
            }
            return code;
        })[0];
    }
    // console.dir(body, { depth: null })
    throw new Error(`Could not find any code to work with!`);
}
// break this out from above to processing the arguments
function processArgs(classBody) {
    console.timeEnd('ast');
    if (classBody.body) {
        return classBody.body
            .filter(body => body.type === 'ClassMethod')
            .map(body => {
            const propertyName = body.key.value;
            return {
                [propertyName]: body.function.params.map(params => {
                    // console.dir(params,  { depth: null })
                    const { pat } = params;
                    switch (pat.type) {
                        case 'AssignmentPattern':
                            return extractAssignmentPattern(pat);
                        default:
                            // type === 'Identifier'
                            return extractIdentifier(pat);
                    }
                })
            };
        })
            .reduce((a, b) => Object.assign(a, b), {});
    }
    throw new Error(`Could not find body within the class file`);
}
// this is just assign a value without type info
function extractAssignmentPattern(pat) {
    console.dir(pat, { depth: null });
    return {
        name: pat.left.value,
        required: !pat.optional,
        types: translateType(pat.right.type),
        value: extractValue(pat.right)
    };
}
// extract the value from the AssignmentPattern
/* examples: @TODO
auto = [1]
{
        type: 'ArrayExpression',
        span: { start: 748, end: 751, ctxt: 0 },
        elements: [
          {
            spread: null,
            expression: {
              type: 'NumericLiteral',
              span: { start: 749, end: 750, ctxt: 0 },
              value: 1,
              raw: '1'
            }
          }
        ]
      }
auto = []
{
        type: 'ArrayExpression',
        span: { start: 748, end: 750, ctxt: 0 },
        elements: []
      }

auto = {}

{
        type: 'ObjectExpression',
        span: { start: 748, end: 750, ctxt: 0 },
        properties: []
      }

auto={a: 1}

{
        type: 'ObjectExpression',
        span: { start: 748, end: 754, ctxt: 0 },
        properties: [
          {
            type: 'KeyValueProperty',
            key: {
              type: 'Identifier',
              span: { start: 749, end: 750, ctxt: 0 },
              value: 'a',
              optional: false
            },
            value: {
              type: 'NumericLiteral',
              span: { start: 752, end: 753, ctxt: 0 },
              value: 1,
              raw: '1'
            }
          }
        ]
      }
*/
function extractValue(pat) {
    switch (pat.type) {
        case 'ArrayExpression':
            return pat.elements;
        case 'ObjectExpression':
            return pat.properties;
        default:
            return pat.value;
    }
}
// translate the type name from an AssignmentPattern
function translateType(swcType) {
    switch (swcType) {
        case 'BooleanLiteral':
            return 'boolean';
        case 'NumericLiteral':
            return 'number';
        case 'StringLiteral':
            return 'string';
        case 'ArrayExpression':
            return 'array';
        case 'ObjectExpression':
            return 'object';
        default:
            return swcType;
    }
}
// wrap this in one method to make the code cleaner
function extractIdentifier(pat) {
    return {
        name: pat.value,
        required: !pat.optional,
        // there might not be a type annotation
        // @TODO need more scenario for testing
        types: extractTypeAnnotation(pat)
    };
}
// type annotation could have different field structures
function extractTypeAnnotation(pat) {
    const annotation = pat?.typeAnnotation?.typeAnnotation;
    if (annotation) {
        // simple type
        switch (annotation.type) {
            case 'TsKeywordType':
                return { type: annotation.kind };
            case 'TsUnionType':
                return {
                    type: 'TsUnionType',
                    // @TODO need futher processing
                    types: annotation.types.map(type => type.kind)
                };
            default: // @TODO
                return annotation;
        }
    }
    // console.dir('could not find annonation', pat)
    return constants_1.NIL;
}