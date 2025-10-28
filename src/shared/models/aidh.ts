import type { ModelDependencies } from '../types/adapters'
import OpenAICompatible, { type OpenAICompatibleSettings } from './openai-compatible'

interface Options extends OpenAICompatibleSettings {}

export default class AIDH extends OpenAICompatible {
  public name = 'AIDH'
  public options: Options
  constructor(options: Omit<Options, 'apiHost'>, dependencies: ModelDependencies) {
    const apiHost = 'https://aidh-inference.dhealth.com/v1'
    super(
      {
        apiKey: options.apiKey,
        apiHost,
        model: options.model,
        temperature: options.temperature,
        topP: options.topP,
        maxTokens: options.maxTokens,
        stream: options.stream,
      },
      dependencies
    )
    this.options = {
      ...options,
      apiHost,
    }
  }
}
