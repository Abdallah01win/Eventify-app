import App from '@/App.vue'
import '@/assets/main.css'
import router from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
