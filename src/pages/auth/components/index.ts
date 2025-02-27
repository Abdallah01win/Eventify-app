import { z } from '@/plugins'
import { toTypedSchema } from '@vee-validate/zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8)
})

export type RegisterForm = z.infer<typeof registerSchema>
export type LoginForm = z.infer<typeof loginSchema>

export const logintypedSchema = toTypedSchema(loginSchema)
export const registertypedSchema = toTypedSchema(registerSchema)
