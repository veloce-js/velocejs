import test from 'ava'
import fs from 'fs-extra'
import { join } from 'path'
import getDirname from '../src/dirname.js'
import { copyPkgJson, copyTemplate } from '../src/copy.js'

const __dirname = getDirname(import.meta.url)
const baseDir = join(__dirname, '..', 'templates')

test(`Testing the copy template function`, t => {
  t.plan(2)

  return copyTemplate()
    .then(() => {
      t.true(fs.existsSync(join(baseDir, 'vite', 'index.html')))
      t.false(fs.existsSync(join(baseDir, 'vite', 'package.json')))
    })
})

test(`Test the copy package.json function`, t => {
  t.plan(1)
  return copyPkgJson()
    .then(() => {
      t.true(fs.existsSync(join(baseDir, 'package.tpl.json')))
    })
})
