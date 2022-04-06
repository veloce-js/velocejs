import { UwsServer } from '@velocejs/server/src';
import { RouteMetaInfo } from '@velocejs/server/src/types';
export declare class FastApi {
    protected uwsInstance: UwsServer;
    constructor(uwsInstance: UwsServer);
    private createServer;
    private mapMethodToHandler;
    run(meta: RouteMetaInfo[]): void;
}
