import { protectedRoutes, default as router } from '@/router'
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

export const currentRouteName = computed(() => {
  return router.currentRoute.value.name?.replace(/\//g, '')
})

export const isProtected = (route: string) => protectedRoutes.find(({ path }) => path === route)

export const hasPermission = (permission: string) => {
  const authStore = useAuthStore()
  const permissions = authStore.user?.permissionsNames || []

  return permissions.includes(permission)
}
