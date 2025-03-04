import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import path from 'path'
import tailwind from 'tailwindcss'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
      extensions: ['.vue'],
      exclude: ['**/components/*.vue']
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: [
      '@vueuse/core',
      '@vee-validate/zod',
      '@internationalized/date',
      'vee-validate',
      'lucide-vue-next',
      'radix-vue',
      'class-variance-authority',
      'tailwind-merge',
      'clsx',
      'reka-ui'
    ]
  }
})
