import { FastApi, Rest, Get } from '../../dist'

@Rest
export class MyDynamicRoute extends FastApi {

  @Get('/posts/:year/:month/:day')
  public posts(year: string, month: string, day: string) {

    this.$json({
      date: [year, month, day].join('-')
    })
  }

  @Get('/news/:year/:month/:day(/:slug)')
  public news(...args: any[]) {
    console.log('news args', args)
    this.$text(args.join('_'))
  }

}
