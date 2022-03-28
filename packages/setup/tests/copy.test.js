import test from 'ava'
import fs from 'fs-extra'
import { join } from 'path'
import getDirname from '../src/dirname.js'
import { copyPkgJson, copyTemplate } from '../src/copy.js'

const __dirname = getDirname(import.meta.url)
const baseDir = join(__dirname, '..', 'templates')

const frameworks = ['ssr-vue', 'ssr-vue-ts']

test(`Testing the copy template function`, t => {
  t.plan(4)

  return copyTemplate()
    .then(() => {
      frameworks.forEach(fw => {
        t.true(fs.existsSync(join(baseDir, fw, ,'tpl', 'index.html')))
        t.false(fs.existsSync(join(baseDir, fw, 'tpl', 'package.json')))
      })
    })
})

test(`Test the copy package.json function`, t => {
  t.plan(4)
  
  return copyPkgJson()
    .then(() => {
      frameworks.forEach(fw =>  {
        const pkgTplFile = join(baseDir, fw, 'package.tpl.json')
        t.true(fs.existsSync(pkgTplFile))
        // should also check the content
        const json = fs.readJsonSync(pkgTplFile)
        t.equals(fw, json.name)
      })
    })
})
