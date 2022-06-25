import { AppOptions, TemplatedApp, us_listen_socket } from './types';
export declare function createApp(opt?: AppOptions): TemplatedApp;
export declare function shutdownServer(listenSocket: us_listen_socket): void;
export declare function getPort(token: us_listen_socket): number;
