// take the type out to avoid a circular reference
// just to type the damn thing to stop the warning
// string to string object with unknown properties
export type StringPairObj = {
  [key: string]: string
}
// Typing the result object
export type UwsRespondBody = {
  url: string
  method: string
  query: string,
  headers: StringPairObj
  params: object,
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
