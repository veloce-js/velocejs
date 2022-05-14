
import { FastApi, Rest, Post } from '../../dist'

@Rest
export class MyWrongDynamicRoute extends FastApi {

  @Post('/posts/:year/:month/:day(/:slug)')
  public posts(year: number, month: number, day: number, slug?: string) {

    this.$json({
      date: [year, month, day].join('-'),
      slug: slug ? slug : 'NOTHING'
    })
  }
}
