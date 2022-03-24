// plop file for all the commands
// scan folder and inject them using cjs
const fs = require('fs-extra')
const { join } = require('path')



// export
module.exports = function(plop) {
  plop.setGenerator('base', {
    description: 'Hello world',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Project Name'
    }],
    actions: function(data) {
      console.log(`Your answer`, data)

      return []
    }
  })
}
