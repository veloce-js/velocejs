import { AppOptions, TemplatedApp } from 'uWebSockets.js';
export declare function createApp(opt?: AppOptions): TemplatedApp;
export declare function shutdownApp(listenSocket: any): void;
export declare function getPort(token: any): number;
export interface HandlersMap {
    type: string;
    path: string;
    handler: (args: Array<any>) => void;
}
