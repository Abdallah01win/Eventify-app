import { z } from '@/plugins'
import { toTypedSchema } from '@vee-validate/zod'

export default toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8)
  })
)
