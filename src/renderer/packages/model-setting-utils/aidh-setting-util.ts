import {
  type ModelProvider,
  ModelProviderEnum,
  type ProviderSettings,
  type SessionType,
} from 'src/shared/types'
import { createModelDependencies } from '@/adapters'
import BaseConfig from './base-config'
import type { ModelSettingUtil } from './interface'
import AIDH from 'src/shared/models/aidh'

// TODO: 重新实现
export default class AIDHSettingUtil extends BaseConfig implements ModelSettingUtil {
  public provider: ModelProvider = ModelProviderEnum.AIDH
  async getCurrentModelDisplayName(
    model: string,
    sessionType: SessionType,
    providerSettings?: ProviderSettings,
  ): Promise<string> {
    return `AIDH API  (${providerSettings?.models?.find((m) => m.modelId === model)?.nickname || model})`
  }

  protected async listProviderModels(settings: ProviderSettings) {
    const model = settings.models?.[0] || { modelId: 'gpt-4o-mini' }

    const dependencies = await createModelDependencies()
    const customOpenAI = new AIDH(
      {
        apiKey: settings.apiKey!,
        model,
        temperature: 0,
        useProxy: settings.useProxy,
      },
      dependencies
    )
    return customOpenAI.listModels()
  }
}
