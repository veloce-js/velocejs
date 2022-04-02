import 'reflect-metadata';
import { RouteMetaInfo, MetaDecorator } from './type';
import { FastApi } from './fast-api';
export declare function RAW(route: string, path: string): (target: FastApi, propertyName: string) => void;
export declare function SERVE_STATIC(path: string): (target: FastApi, propertyName: string) => void;
export declare function PREPARE(target: FastApi, _: string, // propertyName is unused, just placeholder it
descriptor: TypedPropertyDescriptor<(meta: RouteMetaInfo[]) => void>): void;
export declare const ANY: MetaDecorator;
export declare const GET: MetaDecorator;
export declare const POST: MetaDecorator;
export declare const PUT: MetaDecorator;
export declare const OPTIONS: MetaDecorator;
export declare const DEL: MetaDecorator;
export declare const PATCH: MetaDecorator;
export declare const HEAD: MetaDecorator;
export declare function ABORTED(type: string, path: string): (target: FastApi, propertyName: string) => void;
