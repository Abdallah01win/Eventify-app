import { z } from '@/plugins'
import { toTypedSchema } from '@vee-validate/zod'

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
})

export type RegisterForm = z.infer<typeof registerSchema>

export default toTypedSchema(registerSchema)
