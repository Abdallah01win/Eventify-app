import { z } from '@/plugins'
import { toTypedSchema } from '@vee-validate/zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type LoginForm = z.infer<typeof loginSchema>

export default toTypedSchema(loginSchema)
