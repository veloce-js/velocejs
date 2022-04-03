const fs = require('fs-extra')
const { join } = require('path')
const { camelCase } = require('lodash')
const root = __dirname
// use some of the value as default
const rootPkgJson = fs.readJsonSync(join(root, 'package.json'))

/**
Tools for:
1. generate template for new packages


Files are inside the `.plop` folder

**/
module.exports = function(plop) {
  plop.setGenerator('setupNewPackage', {
    description: 'Setup new package',
    prompts: [
      {
        type: 'input',
        name: 'directoryName',
        message: 'Directory name',
        validate: (value) => !(/^[\w\s]{1,}$/.test(value)) || 'No space in directory name!'
      },
      {
        type: 'confirm',
        name: 'sameAsDirectoryName',
        message: 'Use directory name as project name',
        default: false
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'Project name',
        when: function(answers) {
          return !answers.sameAsDirectoryName
        },
        default: function(answers) {
          return camelCase(answers.directoryName)
        }
      },
      // just use the root package.json to fill out the blanks
    ],
    actions: [
      // copy
      function(answer) {
        const { directoryName } = answer
        const dir = join(root, 'packages', directoryName)

        return dir

        if (fs.existsSync( dir )) {
          // keep it consistence, we don't necessary to return as Promise here
          return Promise.resolve(`Directory ${dir} already exist! Aborted`)
        } else {
          const src = join(root, '.plop', 'packages')
          const filter = (file) => file !== 'package.json.tpl'

          return fs.copy(src, dir, { filter })
            .then(() => `New package ${name} created`)
            .catch(() => `Fail to create ${name}`)
        }
      },
      // update package.json
      function(answers) {

        return [{
          type: 'add',
          template: join(root, '.plop', 'packages', 'package.json.tpl'),
          path: join(root, 'packages', answers.directoryName, 'package.json'),
          transform: function(file) {
            console.log(file)
            /*
              name
              author
              license
            */
            return file
          }
        }]
      }
    ]
  })


}
