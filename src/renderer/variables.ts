// 在 webpack.config.base.ts 的 webpack.EnvironmentPlugin 中注册的变量，
// 在编译时 webpack 会根据环境变量替换掉 process.env.XXX

export const CHATBOX_BUILD_TARGET = (process.env.CHATBOX_BUILD_TARGET || 'unknown') as 'unknown' | 'mobile_app'
export const CHATBOX_BUILD_PLATFORM = (process.env.CHATBOX_BUILD_PLATFORM || 'unknown') as
  | 'unknown'
  | 'ios'
  | 'android'
  | 'web'

export const USE_LOCAL_API = process.env.USE_LOCAL_API || ''

export const NODE_ENV = process.env.NODE_ENV || 'development'

// Google Drive integration
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || ''
export const GOOGLE_OAUTH_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID || ''
export const AIDH_API_URL = process.env.AIDH_API_URL || ''