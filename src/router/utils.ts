import { computed } from 'vue'

import router from './index'

export const currentRouteName = computed(() => {
  return router.currentRoute.value.name?.replace(/\//g, '')
})
