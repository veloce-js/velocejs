// create an example of just about every possible scenario

import {
  FastApi,
  Rest,
  Get,
  Post,
  Validate,
} from '../../src'

@Rest
export class MyApi extends FastApi {

  @Get('/post')
  public post(userId?: number) {
    // then we do our things with the userId

    return { userId }
  }

  @Validate([
    {rules: { min: 8, max: 15 }}
  ])
  @Post('/login')
  public login(username: string, password: string) {

    console.log(password)

    return { username, timestamp: Date.now()}
  }

  @Validate()
  @Post('/publish')
  public publish(content: string, title: string, userId?: number | string) {

    console.log(content, userId)

    return { OK: true }
  }

  

}
