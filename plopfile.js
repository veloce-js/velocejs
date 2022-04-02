const fs = require('fs-extra')
const { join } = require('path')
const root = __dirname
/**
Tools for:
1. generate template for new packages


Files are inside the `.plop` folder

**/
module.exports = function(plop) {
  plop.setGenerator('setup', {
    description: 'Setup new package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        description: 'Directory name'
      },
      {
        type: 'confirm',
        name: 'sameAsName',
        description: 'Use directory name as project name',
        default: false
      },
      {
        type: 'input',
        name: 'projectName',
        description: 'Project name',
        when: function(answers) {
          console.log(answers)
        },
        default: function(answers) {
          
        }
      }
    ],
    actions: [
      // copy
      function(answer) {
        const { name } = answer
        const dir = join(root, 'packages', name)

        return dir

        if (fs.existsSync( dir )) {
          // keep it consistence, we don't necessary to return as Promise here
          return Promise.resolve(`Directory ${dir} already exist! Aborted`)
        } else {
          const src = join(root, '.plop', 'packages')
          return fs.copy(src, dir)
            .then(() => `New package ${name} created`)
            .catch(() => `Fail to create ${name}`)
        }
      },
      // update
      function(answer) {

      }
    ]
  })


}
