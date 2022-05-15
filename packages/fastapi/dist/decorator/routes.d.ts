import { FastApiInterface } from '../lib/fast-api-interface';
export declare function Raw(routeType: string, path: string): (target: FastApiInterface, propertyName: string) => void;
/** special decorator to create a serveStatic method, you could specify a routeType default to GET */
export declare function ServeStatic(path: string, routeType?: string): (target: FastApiInterface, propertyName: string) => void;
export declare const Any: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Get: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Post: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Put: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Options: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Del: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Patch: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Head: (path: string) => (target: FastApiInterface, propertyName: string) => void;
export declare const Websocket: (path: string) => (target: FastApiInterface, propertyName: string) => void;
/** @deprecated it will move to the override hook */
export declare function Aborted(type: string, path: string): (target: FastApiInterface, propertyName: string) => void;
