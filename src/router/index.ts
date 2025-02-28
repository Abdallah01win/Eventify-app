import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import authMiddleware from './middleware/authMiddleware'

export * from './utils'
export { default as routesMap } from './routesMap'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authMiddleware)

export default router
