// setup a few different Validaton rules input for testing

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
