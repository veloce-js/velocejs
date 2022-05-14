import { HttpResponse } from './types';
/** taken out from server-static for re-use */
export declare function fileRender(res: HttpResponse): (url: string, file?: any) => void;
/** we are going to have several different type
such as html markdown etc
*/
export declare function getRenderer(res: HttpResponse): (type: string, content: any) => void;
