import { FastApi, Rest, Get, Post, ServeStatic } from '@velocejs/fastapi'
import { join } from 'node:path'

@Rest
export class DevApi extends FastApi {

  // static folder

  @Get('/simple')
  public simple() {
    return {Hello: 'World'}
  }

  @Get('/update/:id')
  public update(id: string) {
    return {msg: `You send ${id} to fetch update`}
  }

  @Post('/test')
  public testPost(id: number, title: string, content?: string) {

    return {
      id, title, content
    }
  }


  @ServeStatic('/*')
  get httpdocs() {
    return join(__dirname, 'dev', 'httpdocs')
  }



}
