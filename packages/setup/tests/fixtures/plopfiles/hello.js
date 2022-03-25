// dummy plopfiles


export default function(plop) {

  plop.setGenerator('hello', {
    description: 'Hello generator',
    prompts: [{
      type: 'confirm',
      name: 'hello',
      description: 'Just to say hello'
    }],
    actions: []
  })
}
