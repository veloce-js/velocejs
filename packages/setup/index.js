// entry
const prompts = require('prompts')


const questions = [
  {
    type: 'text',
    name: 'projectName',
    message: 'What is your project name'
  }
]

prompts(questions)
  .then(response => {
    console.log(response)
  })
