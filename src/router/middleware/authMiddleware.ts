import { handelRequestError } from '@/helpers'
import { useAuthStore } from '@/stores/authStore'
import type { NavigationGuardNext, RouteLocation } from 'vue-router'

const authMiddleware = async (to: RouteLocation, _: unknown, next: NavigationGuardNext) => {
  const authStore = useAuthStore()

  const isAuthenticated = await authStore.initUser().catch(() => false)
  const requiresAuth = to.meta.requiresAuth !== false

  authStore.resetLoading()

  if (requiresAuth && !isAuthenticated) {
    handelRequestError('This action is nauthorized!')

    return next({ name: '/auth/login' })
  }

  if (to.name === '/auth/login' && isAuthenticated) return next({ name: '/' })

  next()
}

export default authMiddleware
