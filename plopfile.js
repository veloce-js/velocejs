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
        name: 'name'
      }
    ],
    actions: [
      {
        
      }
    ]
  })


}
