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

export type GenericArrayValue = Array<any>

import type {
  RequestInit,
  Response
} from 'node-fetch/@types/index' // might have to copy this over

/*
Because we want to allow the dev to use different library to handle the actual
http call (this is very useful when we use this in different environment)

Therefore we create an function to get pass a standard parameters
instead of a whole bunch of different arguments, it will be just an object
like this:
{
  url: [host][route] // if its dynamic route then it will be already constructed
  method?: GET
  payload?: args --> the already validated result
  headers?: extra headers --> it might get override by our internal headers
  [key: string]?: any (arbitrary stuff they need to pass to their http client)
}
*/
export type HttpMethodParams = {
  url: string
  method?: string
  payload?: GenericKeyValue | GenericArrayValue
  headers?: GenericKeyValue
  [key: string]: any
}

export type HttpMethod = (params: HttpMethodParams) => Promise<Response>

// re-export
export type {
  RequestInit,
  Response,
  JsonqlContractTemplate,
  JsonqlContractEntry,
}

// ---------------- try ------------------
