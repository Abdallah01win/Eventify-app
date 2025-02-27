import { handelRequestError } from '@/helpers'
import { useAuthStore } from '@/stores/authStore'

const authMiddleware = async (to: any, _: any, next: any) => {
  const authStore = useAuthStore()

  const isAuthenticated = await authStore.initUser().catch(() => false)
  const requiresAuth = to.meta.requiresAuth !== false

  authStore.resetLoading()

  if (requiresAuth && !isAuthenticated) {
    handelRequestError('This action is nauthorized!')

    return next({ name: '/auth/login' })
  }

  if (to.name === '/auth/login' && isAuthenticated) return next({ name: '/dashboard/' })

  next()
}

export default authMiddleware
