import { FastApi, Rest, Get, Post } from '@velocejs/fastapi'

@Rest
export class ApiWithContract extends FastApi {

  @Get('/news')
  news() {
    return "some news"
  }

  @Post('/post')
  post(title: string, content: string, date: number = Date.now()) {
    return {
      title,
      content,
      date
    }
  }
}
