import type { JsonResponse, User } from '.'

export type AuthResponse = JsonResponse<{ token: string }>

export type InitUser = JsonResponse<{ user: User }>
