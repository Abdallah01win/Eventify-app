import type { CalendarRootProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

export * from './auth'
export * from './user'
export * from './event'
export * from './category'

export interface JsonResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
}

export enum DateFormats {
  DATE = 'YYYY-MM-DD',
  DATETIME = 'YYYY-MM-DD HH:mm:ss',
  TIME = 'HH:mm:ss',
  LONG = 'LL'
}

export type DatePickerCustomProps = CalendarRootProps & {
  disabled?: boolean
  class?: HTMLAttributes['class']
  size?: 'base' | 'sm'
  hasIcon?: boolean
}

export type NumberInputProps = {
  defaultValue?: number
  modelValue?: number | string
  min?: number | false
  max?: number
  disabled?: boolean
  class?: HTMLAttributes['class']
}

export type Options<T> = { label: string; value: T; disabled?: boolean }[]

export type ComboboxProps = {
  options: Options<number | string>
  placeholder: string
  disabled?: boolean
  size?: 'base' | 'sm'
  modelValue?: string | number
}
