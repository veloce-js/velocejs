/// <reference types="node" />
import { HttpResponse } from './types';
/** taken out from server-static for re-use */
export declare function renderFile(res: HttpResponse): (url: string, file?: Buffer) => void;
/** we are going to have several different type
such as html markdown etc
*/
export declare function getRenderFn(res: HttpResponse): (type: string, content: any) => void;
