import { handelRequestError } from '@/helpers'
import { useAuthStore } from '@/stores/authStore'
import type { NavigationGuardNext, RouteLocation } from 'vue-router'

const authMiddleware = async (to: RouteLocation, _: unknown, next: NavigationGuardNext) => {
  const authStore = useAuthStore()

  const isAuthenticated = await authStore.initUser().catch(() => false)
  const requiresAuth = to.meta.requiresAuth !== false

  authStore.resetLoading()

  if (requiresAuth && !isAuthenticated) {
    handelRequestError('This action is unauthorized!')

    return next({ name: '/auth/login' })
  }

  if (['/auth/login', '/auth/register'].includes(to.name) && isAuthenticated)
    return next({ name: '/events/' })

  next()
}

export default authMiddleware
