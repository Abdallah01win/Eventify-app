export * from './auth'

export interface JsonResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}
