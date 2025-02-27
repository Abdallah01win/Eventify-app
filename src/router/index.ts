import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import authMiddleware from './middleware/authMiddleware'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(authMiddleware)

export default router
