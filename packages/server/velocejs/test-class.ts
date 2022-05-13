// just a simple test class
// import { FastApi } from './phony-base'

class FastApi {

  protected protectedRouteHandler() {
    return false
  }

} // just a phony class


export class TestClass extends FastApi {

  protected protectedRouteHandler() {
    return true
  }

  post(year: string, month: string, day: string) {

    return `This is ${[year, month, day].join('-')}`
  }

  public someEndpoint() {

    return 'some end point'
  }

  public login(username: string, password: string) {
    return { username, password }
  }

}
