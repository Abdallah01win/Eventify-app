import { z } from '@/plugins'
import { toTypedSchema } from '@vee-validate/zod'

const loginForm = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type LoginForm = z.infer<typeof loginForm>

export default toTypedSchema(loginForm)
