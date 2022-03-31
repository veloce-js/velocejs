// this will allow you to create a series of REST API in no time

import { UwsRouteSetup } from '../base/interfaces'
import { UwsServer } from '../base/uws-server-class'
import { RouteMetaInfo } from './type'
// We are not going to directly sub-class from the uws-server-class
// instead we create an instance of it
export class FastApi {

  constructor(private uwsInstance: UwsServer) {}

  private createServer(routes: UwsRouteSetup[]) {
    this.uwsInstance.run(routes)
  }

  private mapMethodToHandler(propertyName: string): any {
    const fn = this[propertyName]

    console.log(fn.toString())

    return fn
  }

  // it looks like unnecessary but we might want to do something with
  // the array so we do it like this here

  public run(meta: RouteMetaInfo[]): void {
    this.createServer(
      meta.map(m => {
        const { path, type, propertyName } = m
        const handler = this.mapMethodToHandler(propertyName)

        return { type, path, handler }
      })
    )
  }
}
