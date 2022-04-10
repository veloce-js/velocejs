import { UwsServer } from '@velocejs/server/src';
import { HttpResponse, HttpRequest, UwsRespondBody, UwsWriter, UwsJsonWriter } from '@velocejs/server/src/types';
import { RouteMetaInfo } from '../types';
export declare class FastApi {
    protected uwsInstance: UwsServer;
    private written;
    protected payload: UwsRespondBody | undefined;
    protected res: HttpResponse | undefined;
    protected req: HttpRequest | undefined;
    protected writer: UwsWriter;
    protected jsonWriter: UwsJsonWriter;
    constructor(uwsInstance: UwsServer);
    private setTemp;
    private unsetTemp;
    private createServer;
    private mapMethodToHandler;
    run(meta: RouteMetaInfo[]): Promise<string>;
}
