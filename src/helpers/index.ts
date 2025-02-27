import { toast } from 'vue-sonner'

export const handelRequestError = (msg?: string) => {
  toast.error('An error occurred!', {
    description: msg || 'Something went wrong.'
  })
}
