# @velocejs/validator

This `Validators` is extended from [@jsonql/validators](https://www.npmjs.com/package/@jsonql/validators) with additional features to work with our contract system.

## Installation and usage

```sh
$ npm install @velocejs/validators
```

You need to have a full AST map of your methods, something like this:

```json
{
  "posts": [
    {
      "name": "arg1",
      "required": true,
      "type": "string"
    },
    {
      "name": "arg2",
      "required": true,
      "type": "number"
    }
  ]
}
```

```ts
import { Validators } from '@velocejs/validators'
const validators = new Validators(ast)
// see below
validators
  .addRules('posts', {
    arg2: {
      plugin: 'moreThan', num: 10
    }
  })
  // this behave differently from the parent class
  .validate(['hello', 20])
  .then(result => {
    // do your thing with your result
  })

```

## Available methods

There are two additional methods

### addRules(methodName: string, rules: MixedValidationInput): Validator

This will let you add rules to the validator for the method directly

```ts
// ... init the validators etc
validator.addRules('someMethod', {
  arg1: function(val: number) {
    return val !== 42
  }
})
```

Please note this method will return the `validator` for that particular method (id by `methodName`)
and you can call `validate` immediately after you add rules.

### exportAll()

Export all the rules and plugins (external) in one go

```ts
const schema = validator.exportAll()
// then import into the contract generator and file generator
```

---

Joel Chu (c) 2022
