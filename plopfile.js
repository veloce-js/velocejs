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
        name: 'projectName',
        message: 'Project name',
        transform: camelCase
      },
      {
        type: 'confirm',
        name: 'sameAsProjectName',
        message: 'Use project name as directory name',
        default: false
      },
      {
        type: 'input',
        name: 'directoryName',
        message: 'Directory name (No space allow)',
        validate: (value) => !(/^[\w\s]{1,}$/.test(value)),
        when: function(answers) {

          return !answers.sameAsProjectName
        },
        default: function(answers) {

          return camelCase(answers.projectName)
        }
      },
      // just use the root package.json to fill out the blanks
    ],
    actions:
      function(answers) {
        // prepare some vars
        const projectRoot = join(root, 'packages', answers.sameAsProjectName ? answers.projectName : answers.directoryName)
        const tmplRoot = join(root, '.plop', 'packages')

        return [
          // copy
          function(answer) {
            const { directoryName, projectName, sameAsProjectName } = answer
            const directory = sameAsProjectName ? projectName : directoryName
            // console.log(directory)
            const dir = join(root, 'packages', directory )
            // console.log(dir)
            if (fs.existsSync( dir )) {
              // keep it consistence, we don't necessary to return as Promise here
              return Promise.resolve(`Directory ${dir} already exist! Aborted`)
            } else {
              const src = join(root, '.plop', 'packages')
              const filter = (file) => !(file.indexOf('package.json.tpl') > -1) && !(file.indexOf('README.tpl') > -1)

              return fs.copy(src, dir, { filter })
                .then(() => `New package ${camelCase(projectName)} created in packages/${directory}`)
                .catch(() => `Fail to create ${directory}`)
            }
          },
          // update package.json
          {
            type: 'add',
            templateFile: join(tmplRoot, 'package.json.tpl'),
            path: join(projectRoot, 'package.json'),
            data: {
              name: [rootPkgJson.name, camelCase(answers.projectName)].join('/'),
              author: rootPkgJson.author,
              license: rootPkgJson.license,
              homepage: rootPkgJson.homepage
            },
          },
          {
            type: 'add',
            templateFile: join(tmplRoot, 'README.tpl'),
            path: join(projectRoot, 'README.md')
          }
        ]
      }
  })
}
