import type { Response } from 'node-fetch/@types/index';
import type { HttpMethodParams, Whatever } from './types';
export { Response };
export default function main(params: HttpMethodParams): Promise<Whatever>;
