import {
  FastApi,
  Rest,
  Post,
  Get,
  Validate
} from '../../src'

@Rest
export class MyExample extends FastApi {

  // @Validate()
  @Post('/submit')
  async submitHandler(a: string, c: number, d?: any[]) {
    return 'go see the result in console'
  }

  @Validate({
    name: [{ plugin: 'lessThan', num: 20 }],
    password: { plugin: 'between', max: 20, min: 5 }
  })
  @Post('/login')
  login(name: string, password: string) {

    return { name }
  }

  @Validate()
  @Post('/other')
  someOtherApi(x: number, y: number | string) {
    return { x , y }
  }


  // @Validate() // this one should throw an error
  @Get('/')
  defaultHandler() {
    return 'some text'
  }
}
