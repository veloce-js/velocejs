import { HttpResponse, StringPairObj } from '../types';
export declare const writeJson: (res: HttpResponse, jsonObj: object) => void;
export declare const getCorkWriter: (res: HttpResponse) => (payload: string, headers?: StringPairObj | undefined) => void;
