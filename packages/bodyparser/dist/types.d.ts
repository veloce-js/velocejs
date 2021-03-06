// specify your types here
export type AnyType = any // cheating
// for parse-multipart
export type Part = {
  header: string
  info: string
  part: number[]
}

export type Input = {
  filename?: string
  name?: string
  type: string
  data: Buffer
}

// from uws
export interface us_socket_context_t {}

export type RecognizedString = string | ArrayBuffer | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;

export interface HttpResponse {
    writeStatus(status: RecognizedString) : HttpResponse;
    writeHeader(key: RecognizedString, value: RecognizedString) : HttpResponse;
    write(chunk: RecognizedString) : boolean;
    end(body?: RecognizedString, closeConnection?: boolean) : HttpResponse;
    tryEnd(fullBodyOrChunk: RecognizedString, totalSize: number) : [boolean, boolean];
    close() : HttpResponse;
    getWriteOffset() : number;
    onWritable(handler: (offset: number) => boolean) : HttpResponse;
    onAborted(handler: () => void) : HttpResponse;
    onData(handler: (chunk: ArrayBuffer, isLast: boolean) => void) : HttpResponse;
    getRemoteAddress() : ArrayBuffer;
    getRemoteAddressAsText() : ArrayBuffer;
    getProxiedRemoteAddress() : ArrayBuffer;
    getProxiedRemoteAddressAsText() : ArrayBuffer;
    cork(cb: () => void) : HttpResponse;
    upgrade<T>(userData : T, secWebSocketKey: RecognizedString, secWebSocketProtocol: RecognizedString, secWebSocketExtensions: RecognizedString, context: us_socket_context_t) : void;
    [key: string]: any;
}

export interface HttpRequest {
    getHeader(lowerCaseKey: RecognizedString) : string;
    getParameter(index: number) : string;
    getUrl() : string;
    getMethod() : string;
    getQuery() : string;
    getQuery(key: string) : string;
    forEach(cb: (key: string, value: string) => void) : void;
    setYield(yield: boolean) : HttpRequest;
}

// our custom types
export type UwsStringPairObj = {
  [key: string]: string
}

export type UwsStringAnyObj = {
  [key: string]: AnyType
}

// Typing the result object
export type UwsRespondBody = {
  url: string
  method: string
  query: string
  headers: UwsStringPairObj
  params: UwsStringAnyObj
  // instead of a lot of different key those from url will be here
  queryParams: UwsStringAnyObj
  // just flattern the structure instead of one level down from params
  names?: Array<string>
  type?: string,
  payload?: Buffer
}
// this is the key values from the bodyParser
export type UwsBodyParserFileEntry = {
  type: string
  filename: string
  data: Buffer
}

export type UwsBodyParserMixEntry = {
  [key: string]: string | Buffer | UwsBodyParserFileEntry
}

export type UwsBodyParserOptions = {
  stripUnderscoreParam?: boolean
  _originalRouteDef?: string // this is private
  _urlPatternObj?: AnyType
  // [key: string]: any
}
