// setup a few different Validaton rules input for testing
export const astMap = {
  submitHandler: [
    { name: 'a', required: true, types: { type: 'string' } },
    { name: 'c', required: true, types: { type: 'number' } },
    {
      name: 'd',
      required: true,
      types: {
        type: 'TsArrayType',
        span: { start: 198, end: 203, ctxt: 0 },
        elemType: {
          type: 'TsKeywordType',
          span: { start: 198, end: 201, ctxt: 0 },
          kind: 'any'
        }
      }
    }
  ],
  login: [
    { name: 'name', required: true, types: { type: 'string' } },
    { name: 'id', required: false, types: { type: 'number' } }
  ],
  defaultHandler: []
}

export const completeRule = {
  name: {
    type: 'string',
    required: true,
    rules: [
      {max: 20},
      {min: 5}
    ]
  },
  id: {
    type: 'number',
    required: false,
    rules: [
      {type: 'integer'}
    ]
  }
}
/*
{
  name: [ { required: true, type: 'string', max: 20 } ],
  id: [ { required: false, type: 'number', max: 20 } ]
}
*/
export const listRule = [
  [
    {max: 20},
    {min: 5}
  ],
  [
    {type: 'integer'}
  ]
]

export const simpleRule = [
  {max: 20}, // can only have one rule per argument
  {type: 'integer'}
]

export const argList = [
  { name: 'name', required: true, types: { type: 'string' } },
  { name: 'id', required: false, types: { type: 'number' } }
]

export const simpleCompleteRule = {
  name: { rules: [ { max: 20 } ] },
  id: { rules: [ { max: 20 } ] }
}
