import type { LoginForm } from '@/pages/auth/components/loginSchema'
import type { RegisterForm } from '@/pages/auth/components/registerSchema'
import { axios } from '@/plugins'
import router from '@/router'
import type { InitUser } from '@/types'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<InitUser | null>(null)
  const loading = ref(false)

  const login = (form: LoginForm) => {
    return new Promise((_, reject) => {
      axios
        .post('auth/login', form)
        .then(({ data }) => {
          Cookies.set('token', data?.token)
          router.push('/dashboard')
        })
        .catch(() => reject())
    })
  }

  const register = (form: RegisterForm) => {
    return new Promise((_, reject) => {
      axios
        .post('auth/register', form)
        .then(({ data }) => {
          Cookies.set('token', data.token)
          router.push('/dashboard')
        })
        .catch(() => reject())
    })
  }

  const initUser = () => {
    return new Promise((resolve, reject) => {
      if (user.value !== null) return resolve(user.value)

      const token = Cookies.get('token')

      if (token) {
        if (router.currentRoute.value.name !== '/') loading.value = true

        axios
          .get<InitUser>('auth/me')
          .then(({ data }) => {
            user.value = data
            resolve(data)
          })
          .catch(() => {
            Cookies.remove('token')
            reject(null)
          })
      } else {
        reject()
      }
    })
  }

  const logout = () => {
    return new Promise((_, reject) => {
      axios.post('logout').then(
        () => {
          user.value = null
          Cookies.remove('token')
          router.push('/')
        },
        () => reject()
      )
    })
  }

  const resetLoading = () => (loading.value = false)

  return { user, loading, login, register, initUser, resetLoading, logout }
})
