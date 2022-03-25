// here we just test small methods here and there
import test from 'ava'

import { checkUpdate } from '../src/check-update.js'

test('testing the regex for the project name input', t => {
    const result = /^[\w\s]{1,}$/.test(`Hello world`)
    t.true(result)
})


test('should able to get the version before timeout', t => {
  t.plan(1)
  // 5 seconds timeout??? WTF
  return checkUpdate()
    .then(version => {
      console.log(version)
      t.truthy(version)
    })
})
