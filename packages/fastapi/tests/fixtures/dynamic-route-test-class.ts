import { FastApi, Rest, Get } from '../../src'

@Rest
export class MyDynamicRoute extends FastApi {

  @Get('/posts/:year/:month/:day')
  public posts(year: string, month: string, day: string) {

    return JSON.stringify({
      date: [year, month, day].join('-')
    })
  }

  @Get('/news/:year/:month/:day(/:slug)')
  public news(...args: any[]) {
    console.log('news args', args)
    return args.join('_')
  }

}
