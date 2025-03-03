import { hasPermission, isProtected } from '@/router'
import type { NavigationGuardNext, RouteLocation } from 'vue-router'

const permissionMiddleware = async (to: RouteLocation, _: unknown, next: NavigationGuardNext) => {
  const routeInfo = isProtected(to.path)

  if (!routeInfo) return next()
  return hasPermission(routeInfo.permissions.read) ? next() : next({ path: '404' })
}

export default permissionMiddleware
