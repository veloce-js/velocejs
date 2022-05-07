
import { FastApi, Rest, Post } from '../../src'

@Rest
export class MyWrongDynamicRoute extends FastApi {

  @Post('/posts/:year/:month/:day(/:slug)')
  public posts(year: number, month: number, day: number, slug?: string) {

    return {
      date: [year, month, day].join('-'),
      slug: slug ? slug : 'NOTHING'
    }
  }
}
