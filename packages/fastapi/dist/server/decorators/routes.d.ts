import { RouteMetaInfo, MetaDecorator } from '../../types';
export declare function Raw(route: string, path: string): (target: any, propertyName: string) => void;
export declare function ServeStatic(path: string): (target: any, propertyName: string) => void;
export declare function Prepare(target: any, _: string, // propertyName is unused, just placeholder it
descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>): void;
export declare const Main: typeof Prepare;
export declare const Any: MetaDecorator;
export declare const Get: MetaDecorator;
export declare const Post: MetaDecorator;
export declare const Put: MetaDecorator;
export declare const Options: MetaDecorator;
export declare const Del: MetaDecorator;
export declare const Patch: MetaDecorator;
export declare const Head: MetaDecorator;
export declare function Aborted(type: string, path: string): (target: any, propertyName: string) => void;
