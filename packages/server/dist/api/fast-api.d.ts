import 'reflect-metadata';
import { UwsServer } from '../base/uws-server-class';
import { RouteMetaInfo } from './type';
export declare class FastApi {
    protected uwsInstance: UwsServer;
    constructor(uwsInstance: UwsServer);
    private createServer;
    private mapMethodToHandler;
    run(meta: RouteMetaInfo[]): void;
}
