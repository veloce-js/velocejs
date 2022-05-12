import { FastApi, Rest, Get, Post, ServeStatic } from '@velocejs/fastapi'
import { join } from 'node:path'

@Rest
export class DevApi extends FastApi {

  // static folder

  @ServeStatic
  get staticPath() {
    return join(__dirname, 'dev', 'httpdocs')
  }


}
