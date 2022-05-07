import { FastApi, Rest, Get } from '../../src'

@Rest
export class MyDynamicRoute extends FastApi {

  @Get('/posts/:year/:month/:day(/:slug)')
  public posts(year: string, month: string, day: string, slug?: string) {

    return {
      date: [year, month, day].join('-'),
      slug: slug ? slug : 'NOTHING'
    }
  }
}
