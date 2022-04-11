import {
  FastApi,
  Post
} from '../../src'

@Rest
class MyExample extends FastApi {

  @Post('/submit')
  submitHandler() {
    return 'go see the result in console'
  }

  @Get('/')
  defaultHandler() {
    return 'some text'
  }
}

const api = new MyExample()
api.start()
  .then(url => {
    console.log(`server started on ${url}`)
    open(url)
  })
  .catch(err => {
    console.log(err)
  })
