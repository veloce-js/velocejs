const test = require('ava')
const fs = require('fs-extra')
const { join } = require('path')

const copyFunc = require('../src/copy')
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
