import { dayjs } from '@/plugins'
import { DateFormats } from '@/types'
import { toast } from 'vue-sonner'

export const handelRequestError = (msg?: string) => {
  toast.error('An error occurred!', {
    description: msg || 'Something went wrong.'
  })
}

export const formatDate = (date: unknown, format: DateFormats = DateFormats.LONG) => {
  return dayjs(String(date)).format(format)
}

export const asideSizes = {
  collapsed: 4,
  min: 15,
  max: 20
}
