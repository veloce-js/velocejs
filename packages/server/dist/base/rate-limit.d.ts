import { WebSocket } from '../types';
export declare function rateLimit(limit: number, interval: number): (ws: WebSocket) => boolean | void;
