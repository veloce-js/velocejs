// create an example of just about every possible scenario

import {
  FastApi
  Rest,
  Get,
  Post,

} from '../../src/server/fast-api'

@Rest
export class MyApi extends FastApi {

  @Get('/some-getter')
  public someGetter(userId?: number) {
    // then we do our things with the userId

    return { userId }
  }

  @Post('/login')
  public login(username: string, password: string) {

    console.log(password)

    return { username, timestamp: Date.now()}
  }

  
}
