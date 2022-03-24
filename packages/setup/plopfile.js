// plop file for all the commands
// scan folder and inject them using cjs
import fs from 'fs-extra'
const { join } from 'path'

const tplDir = join(__dirname, 'templates')

const destDir = process.env.NODE_ENV === 'dev' ? join(__dirname, 'tests', 'fixtures') : process.cwd()

// export
export default function(
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  // create custom actions
  plop.setActionType('copyTemplates', function(answers, config, plop) {
    const { name } = answers

    console.log(name)

    return `${name} is OK`
  })

  // setting up the package.json
  plop.setActionType('setupPackageJson', function(answers, config, plop) {
    const pkg = fs.readJsonSync( join(tplDir, 'package.json') )
    pkg.name = answers.name

    // fs.writeJsonSync( join(destDir, 'package.json') , pkg)

    return `package.json created`
  })

  // create the generator
  plop.setGenerator('base', {
    description: 'Hello world',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Project Name',
      validate: (value) => !(/^[\w\s]{1,}$/.test(value))
    }],
    actions: [
      {
        type: 'copyTemplates'
      },
      {
        type: 'setupPackageJson'
      }
    ]
  })
}
