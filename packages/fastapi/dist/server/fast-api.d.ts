import { AppOptions, HttpResponse, HttpRequest, UwsRespondBody, UwsWriter, UwsJsonWriter } from '@velocejs/server/src/types';
export declare class FastApi {
    private uwsInstance;
    private written;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    protected writer: UwsWriter;
    protected jsonWriter: UwsJsonWriter;
    constructor(config?: AppOptions);
    private prepare;
    private setTemp;
    private unsetTemp;
    private mapMethodToHandler;
    private prepareRoutes;
    /**
      We remap some of the methods from UwsServer to here for easier to use
      const myApp = new MyApi(new UwsServer())
      myApp.start()
           .then(serverInfo => {
             do things with it
           })
    **/
    start(port?: number, host?: string): Promise<string>;
    stop(): void;
}
