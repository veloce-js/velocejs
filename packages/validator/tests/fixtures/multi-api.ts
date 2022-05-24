


export default class MultiApi {


  public posts(arg1: string, arg2: number): string {
    return `${arg1} is not ${arg2}`
  }

  public archive(id: number): string {
    return `Return with no.${id}`
  }

  public someThingRandom(...args: any[]) {
    return `Random result with ${args.join(',')}`
  }

}
