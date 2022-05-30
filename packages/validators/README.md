# @velocejs/validator

This `Validators` is extended from [@jsonql/validators](https://www.npmjs.com/package/@jsonql/validators) with additional features to work with our contract system.

## Installation


## Available methods

There are two additional methods

### addRules(methodName: string, rules: MixedValidationInput)

This will let you add rules to the validator for the method directly

```ts
// ... init the validators etc
validator.addRules('someMethod', {
  arg1: function(val: number) {
    return val !== 42
  }
})
```

### exportAll()

Export all the rules and plugins (external) in one go

```ts
const schema = validator.exportAll()
// then import into the contract generator and file generator
```

---

Joel Chu (c) 2022
