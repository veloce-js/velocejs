import {
  FastApi,
  Rest,
  Post,
  Get,
  Validate
} from '../../src'

@Rest
class MyExample extends FastApi {

  // @Validate()
  @Post('/submit')
  async submitHandler(a: string, c: number, d?: any[]) {
    return 'go see the result in console'
  }

  @Validate({
    name: [{ plugin: 'lessThan', num: 20 }],
    id: { plugin: 'lessThan', num: 20 }
  })
  @Post('/login')
  login(name: string, id?: number) {

    return 'done'
  }

  @Validate()
  @Post('/other')
  someOtherApi(x: number, y: number | string) {
    return { x , y }
  }


  @Validate() // this one should throw an error 
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
