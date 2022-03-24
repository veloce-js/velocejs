// plop file for all the commands
// scan folder and inject them using cjs

module.exports = function(plop) {
  plop.setGenerator('base', {
    description: 'Hello world',
    prompts: [{
      type: 'confirm',
      name: 'start',
      message: 'OK to start?'
    }],
    actions: function(data) {
      console.log(`Your answer`, data)

      return []
    }
  })
}
