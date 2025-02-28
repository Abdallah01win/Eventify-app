export * from './auth'
export * from './user'
export * from './event'

export interface JsonResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}

export interface Route {
  name: string
  icon: string
}

export enum DateFormats {
  DATE = 'YYYY-MM-DD',
  DATETIME = 'YYYY-MM-DD HH:mm:ss',
  TIME = 'HH:mm:ss',
  LONG = 'LL'
}
