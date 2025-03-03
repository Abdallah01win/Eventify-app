import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import authMiddleware from './middleware/authMiddleware'
import permissionMiddleware from './middleware/permissionMiddleware'

export * from './utils'
export { protectedRoutes } from './protectedRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authMiddleware)
router.beforeEach(permissionMiddleware)

export default router
