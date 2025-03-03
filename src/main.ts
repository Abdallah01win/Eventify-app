import App from '@/App.vue'
import '@/assets/main.css'
import { hasPermission, default as router } from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.directive('can', (_, binding, vnode) => {
  if (!hasPermission(binding.value)) {
    vnode.el.hidden = true
    vnode.el.remove()
  }
})

app.mount('#app')
