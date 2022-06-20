// plop file for all the commands
import { join } from 'path'
import fs from 'fs-extra'
import getDirname from './src/dirname.mjs'
import { importPlopfile } from './src/import-plopfile.mjs'
// import { spaceInValue } from './src/common.mjs'
const __dirname = getDirname(import.meta.url)
const tplDir = join(__dirname, 'templates')
const isTest = process.env.NODE_ENV === 'test'
const destDir = isTest ? join(__dirname, 'tests', 'fixtures') : process.cwd()
const projectRoot = isTest ? __dirname : process.cwd()
// @TODO scan the dest to see if there is any plopfile.js
// if yes then import it here and run within the method also

// export
export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // create custom actions
  plop.setActionType('copyTemplates', function (answers, config, plop) {
    const { name, lang } = answers
    const d = lang === 'js' ? 'ssr-vue' : 'ssr-vue-ts'

    return fs.copy(
      join(tplDir, d),
      join(destDir, name),
      {
        overwrite: false,
        errorOnExist: true
      }
    ).then(() => `Project ${name} created`)
  })

  // setting up the package.json
  plop.setActionType('setupPackageJson', function (answers, config, plop) {
    const { name } = answers
    const pkg = fs.readJsonSync(join(tplDir, 'package.tpl.json'))
    pkg.name = name
    fs.writeJsonSync(join(destDir, name, 'package.json'), pkg, { spaces: 2 })

    return 'package.json created'
  })

  plop.setActionType('copyVeloceConfig', function (answers) {
    return fs.copy(
      join(tplDir, 'veloce.config.tpl.js'),
      join(destDir, answers.name, 'veloce.config.js')
    )
  })

  plop.setActionType('justEndMessage', function () {
    return 'Setup completed, now please run "npm install" then run "npm run dev"'
  })

  // create the generator
  // @TODO add more framework support next
  plop.setGenerator('base', {
    description: 'Hello world',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Project Name'
      // validate: spaceInValue // @BUG this is broken!
    }, {
      type: 'list',
      name: 'lang',
      message: 'Select development langauge',
      choices: [
        { name: 'Javascript', value: 'js' },
        { name: 'Typescript', value: 'ts' }
      ],
      default: 'js'
    }],
    actions: [
      {
        type: 'copyTemplates'
      },
      {
        type: 'setupPackageJson'
      },
      {
        type: 'copyVeloceConfig'
      },
      {
        type: 'justEndMessage'
      }
    ]
  })
  // next we will try to import plopfile that is written by the developer
  // then import it here
  importPlopfile(projectRoot, plop)
}
