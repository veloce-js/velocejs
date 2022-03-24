import test from 'ava'
import fs from 'fs-extra'
import { join } from 'path'
import getDirname from '../src/dirname.js'
import copyFunc from '../src/copy.js'

const __dirname = getDirname(import.meta.url)
const baseDir = join(__dirname, '..', 'templates')

test(`Testing the copy template function`, t => {
  t.plan(3)

  return copyFunc()
    .then(() => {
      t.true(fs.existsSync(join(baseDir, 'vite', 'index.html')))
      t.false(fs.existsSync(join(baseDir, 'vite', 'package.json')))
      t.true(fs.existsSync(join(baseDir, 'package.json')))
    })
})
