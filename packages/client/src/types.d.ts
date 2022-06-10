// specify your types here
import type {
  JsonqlContractTemplate,
  JsonqlContractEntry,
} from '@jsonql/contract/index'
export type {
  JsonqlValidationRule,
  ValidateFn,
  ArgsListType,
  JsonqlPropertyParamMap,
} from '@jsonql/validators/index'


export type GenericKeyValue = {
  [key: string]: any
}

import type {
  RequestInit,
  Response
} from 'node-fetch/@types/index' // might have to copy this over

// we don't want to bind to particular ajax client
// you should able to use anything (default we have a Fetch wrapper)
// same principle apply you could use fly anxios whatever as long as you have
// this types defined
export type FetchMethod = (
  url: string,
  init?: RequestInit
) => Promise<Response>

// re-export
export {
  Response,
  JsonqlContractTemplate,
  JsonqlContractEntry,
}
