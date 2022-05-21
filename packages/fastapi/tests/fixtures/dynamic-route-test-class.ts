import { FastApi, Rest, Get, Validate } from '../../src'

@Rest
export class MyDynamicRoute extends FastApi {

  @Get('/posts/:year/:month/:day')
  @Validate()
  public posts(year: string, month: number, day: number) {

    this.$json({
      date: [year, month, day].join('-')
    })
  }

  @Get('/news/:year/:month/:day(/:slug)')
  public news(...args: string[]) {
    // console.log('news args', args)
    this.$text(args.join('_'))
  }


  @Get('/mix-spread/:category/:subcategory/:id/:subcat_id')
  public mixSpread(category: string, ...ids: number[]) {

    this.$text(`This is searching in ${category} with ${ids.join('_')}`)
  }

}
