import type { JsonResponse } from '.'

export type AuthResponse = JsonResponse<{ token: string }>

export type InitUser = JsonResponse<{
  user: {
    readonly id: number
    name: string
    email: string
    created_at: Date
    rolesNames: string[]
    permissionsNames: string[]
  }
}>
