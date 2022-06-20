// here we just test small methods here and there
import test from 'ava'

import { join } from 'path'
import { findPlopfile } from '../src/import-plopfile.mjs'
import getDirname from '../src/dirname.mjs'
import { checkUpdate } from '../src/check-update.mjs'

const __dirname = getDirname(import.meta.url)

test('testing the regex for the project name input', t => {
  const result = /^[\w\s]{1,}$/.test('Hello world')
  t.true(result)
})

test('should able to get the version before timeout', t => {
  t.plan(1)

  return checkUpdate()
    .then(version => {
      // console.log(version)
      t.truthy(version)
    })
})

test('Should able to dynamically import other esm module', t => {
  t.plan(1)
  return findPlopfile(join(__dirname, 'fixtures', 'dummy'))
    .then(fns => {
      if (fns && fns.length) {
        t.true(typeof fns[0].default === 'function')
      }
    })
})
