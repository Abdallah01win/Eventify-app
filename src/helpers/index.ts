import { dayjs } from '@/plugins'
import { DateFormats } from '@/types'
import type { Ref } from 'vue'
import { toast } from 'vue-sonner'

export const handelRequestError = (msg?: string) => {
  toast.error('An error occurred!', {
    description: msg || 'Something went wrong.'
  })
}

export const formatDate = (date: unknown, format: DateFormats = DateFormats.LONG) => {
  return dayjs(String(date)).format(format)
}

export const resetForm = <Form extends Ref<any>, Init>(form: Form, initForm: Init) => {
  setTimeout(() => {
    form.value = { ...initForm }
  }, 100)
}
