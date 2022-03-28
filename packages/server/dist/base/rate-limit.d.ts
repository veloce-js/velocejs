import { WebSocket } from 'uWebSockets.js';
export declare function rateLimit(limit: number, interval: number): (ws: WebSocket) => boolean | void;
