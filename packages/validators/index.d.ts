// specify your types here
import type {
  JsonqlPropertyParamMap,
  JsonqlObjectValidateInput,
  JsonqlArrayValidateInput,
  MixedValidationInput,
} from '@jsonql/validator/index'

export declare type VeloceAstMap = {
  [propertyName: string]: Array<JsonqlPropertyParamMap>
}

export declare type ValidationRuleRecord = JsonqlObjectValidateInput | JsonqlArrayValidateInput

export declare type ExportedSchema = { schema: any, plugins: any }

export type {
  JsonqlPropertyParamMap,
  JsonqlObjectValidateInput,
  JsonqlArrayValidateInput,
  MixedValidationInput,
}

export type ClientPluginConfigs = {
  [pluginName: string]: JsonqlValidationPlugin 
}
