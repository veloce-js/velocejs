// start from scratch to test the problem again
import { FastApi, Rest, Get, Post, Validate } from '../../src'


@Rest
export class BasicApiValidation extends FastApi {

  @Get('/first')
  first() {
    this.$text('FIRST')
  }

  @Post('/login')
  @Validate({
    password: {
      plugin: 'myPasswordVal'
    }
  })
  login(username: string, password: string) {

    const code = password + username

    this.$json({ code })
  }

}
