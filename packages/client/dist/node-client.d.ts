import type { JsonqlContractTemplate } from './types';
import { HttpClient } from './http-client';
/** factory method to create a new node client */
export declare function nodeClient(contract: JsonqlContractTemplate, host?: string): HttpClient;
