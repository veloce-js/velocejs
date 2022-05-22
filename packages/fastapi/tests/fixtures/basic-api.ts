// start from scratch to test the problem again
import { FastApi, Rest, Get } from '../../src'


@Rest
export class BasicApi extends FastApi {

  @Get('/first')
  first() {
    this.$text('FIRST')
  }
  
}
