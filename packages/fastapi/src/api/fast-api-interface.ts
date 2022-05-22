// just experiment with this
// the reason is the decorator target can not get Type correctly

export interface FastApiInterface {

  $start(port?: number, host?: string): Promise<string>

  $stop(): void
}
