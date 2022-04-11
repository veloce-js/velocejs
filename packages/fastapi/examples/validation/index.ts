import {
  FastApi,
  Rest,
  Post,
  Get,
} from '../../src'

@Rest
class MyExample extends FastApi {

  @Post('/submit')
  async submitHandler    (a: string, c: number, d: any[]) {
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
    // open(url)
    api.stop()

  })
  .catch(err => {
    console.log(err)
  })
