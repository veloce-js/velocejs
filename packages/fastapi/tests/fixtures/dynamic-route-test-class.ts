import { FastApi, Get } from '../../src'


export class MyDynamicRoute extends FastApi {

  @Get('/posts/:year/:month/:day(/:slug)')
  public posts(year: number, month: number, day: number, slug?: string) {

    return {
      date: [year, month, day].join('-'),
      slug: slug ? slug : 'NOTHING'
    }
  }
}
