import { z } from '@/plugins'
import { toTypedSchema } from '@vee-validate/zod'

export default toTypedSchema(
  z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8)
  })
)
