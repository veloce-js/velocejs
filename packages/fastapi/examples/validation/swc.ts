import { astParser } from '../../src/server/lib/ts-ast-parser'
import { join } from 'path'

const infile = join(__dirname, 'index.ts')

astParser(infile)
  /*
  .then(ast => {
    ast[0].body.map(body => {
      body.function.params.map(b => {
        console.log(b.pat.value)
        console.log(b.pat.typeAnnotation)
      })
    })
  })
  */
/*
we get this

[
  {
    type: 'ClassDeclaration',
    identifier: {
      type: 'Identifier',
      span: { start: 75, end: 84, ctxt: 0 },
      value: 'MyExample',
      optional: false
    },
    declare: false,
    span: { start: 63, end: 291, ctxt: 0 },
    decorators: [
      {
        type: 'Decorator',
        span: { start: 63, end: 68, ctxt: 0 },
        expression: {
          type: 'Identifier',
          span: { start: 64, end: 68, ctxt: 0 },
          value: 'Rest',
          optional: false
        }
      }
    ],
    body: [
      {
        type: 'ClassMethod',
        span: { start: 106, end: 228, ctxt: 0 },
        key: {
          type: 'Identifier',
          span: { start: 131, end: 144, ctxt: 0 },
          value: 'submitHandler',
          optional: false
        },
        function: {
          params: [
            {
              type: 'Parameter',
              span: { start: 149, end: 158, ctxt: 0 },
              decorators: [],
              pat: {
                type: 'Identifier',
                span: { start: 149, end: 158, ctxt: 0 },
                value: 'a',
                optional: false,
                typeAnnotation: {
                  type: 'TsTypeAnnotation',
                  span: { start: 150, end: 158, ctxt: 0 },
                  typeAnnotation: {
                    type: 'TsKeywordType',
                    span: { start: 152, end: 158, ctxt: 0 },
                    kind: 'string'
                  }
                }
              }
            },
            {
              type: 'Parameter',
              span: { start: 160, end: 169, ctxt: 0 },
              decorators: [],
              pat: {
                type: 'Identifier',
                span: { start: 160, end: 169, ctxt: 0 },
                value: 'c',
                optional: false,
                typeAnnotation: {
                  type: 'TsTypeAnnotation',
                  span: { start: 161, end: 169, ctxt: 0 },
                  typeAnnotation: {
                    type: 'TsKeywordType',
                    span: { start: 163, end: 169, ctxt: 0 },
                    kind: 'number'
                  }
                }
              }
            },
            {
              type: 'Parameter',
              span: { start: 171, end: 179, ctxt: 0 },
              decorators: [],
              pat: {
                type: 'Identifier',
                span: { start: 171, end: 179, ctxt: 0 },
                value: 'd',
                optional: false,
                typeAnnotation: {
                  type: 'TsTypeAnnotation',
                  span: { start: 172, end: 179, ctxt: 0 },
                  typeAnnotation: {
                    type: 'TsArrayType',
                    span: { start: 174, end: 179, ctxt: 0 },
                    elemType: {
                      type: 'TsKeywordType',
                      span: { start: 174, end: 177, ctxt: 0 },
                      kind: 'any'
                    }
                  }
                }
              }
            }
          ],
          decorators: [
            {
              type: 'Decorator',
              span: { start: 106, end: 122, ctxt: 0 },
              expression: {
                type: 'CallExpression',
                span: { start: 107, end: 122, ctxt: 0 },
                callee: {
                  type: 'Identifier',
                  span: { start: 107, end: 111, ctxt: 0 },
                  value: 'Post',
                  optional: false
                },
                arguments: [
                  {
                    spread: null,
                    expression: {
                      type: 'StringLiteral',
                      span: { start: 112, end: 121, ctxt: 0 },
                      value: '/submit',
                      raw: "'/submit'"
                    }
                  }
                ],
                typeArguments: null
              }
            }
          ],
          span: { start: 106, end: 228, ctxt: 0 },
          body: {
            type: 'BlockStatement',
            span: { start: 181, end: 228, ctxt: 0 },
            stmts: [
              {
                type: 'ReturnStatement',
                span: { start: 187, end: 224, ctxt: 0 },
                argument: {
                  type: 'StringLiteral',
                  span: { start: 194, end: 224, ctxt: 0 },
                  value: 'go see the result in console',
                  raw: "'go see the result in console'"
                }
              }
            ]
          },
          generator: false,
          async: true,
          typeParameters: null,
          returnType: null
        },
        kind: 'method',
        isStatic: false,
        accessibility: null,
        isAbstract: false,
        isOptional: false,
        isOverride: false
      },
      {
        type: 'ClassMethod',
        span: { start: 232, end: 289, ctxt: 0 },
        key: {
          type: 'Identifier',
          span: { start: 244, end: 258, ctxt: 0 },
          value: 'defaultHandler',
          optional: false
        },
        function: {
          params: [],
          decorators: [
            {
              type: 'Decorator',
              span: { start: 232, end: 241, ctxt: 0 },
              expression: {
                type: 'CallExpression',
                span: { start: 233, end: 241, ctxt: 0 },
                callee: {
                  type: 'Identifier',
                  span: { start: 233, end: 236, ctxt: 0 },
                  value: 'Get',
                  optional: false
                },
                arguments: [
                  {
                    spread: null,
                    expression: {
                      type: 'StringLiteral',
                      span: { start: 237, end: 240, ctxt: 0 },
                      value: '/',
                      raw: "'/'"
                    }
                  }
                ],
                typeArguments: null
              }
            }
          ],
          span: { start: 232, end: 289, ctxt: 0 },
          body: {
            type: 'BlockStatement',
            span: { start: 261, end: 289, ctxt: 0 },
            stmts: [
              {
                type: 'ReturnStatement',
                span: { start: 267, end: 285, ctxt: 0 },
                argument: {
                  type: 'StringLiteral',
                  span: { start: 274, end: 285, ctxt: 0 },
                  value: 'some text',
                  raw: "'some text'"
                }
              }
            ]
          },
          generator: false,
          async: false,
          typeParameters: null,
          returnType: null
        },
        kind: 'method',
        isStatic: false,
        accessibility: null,
        isAbstract: false,
        isOptional: false,
        isOverride: false
      }
    ],
    superClass: {
      type: 'Identifier',
      span: { start: 93, end: 100, ctxt: 0 },
      value: 'FastApi',
      optional: false
    },
    isAbstract: false,
    typeParams: null,
    superTypeParams: null,
    implements: []
  }
]


*/
