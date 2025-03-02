import type { LoginForm, RegisterForm } from '@/pages/auth/components'
import { axios } from '@/plugins'
import router from '@/router'
import type { InitUser, User } from '@/types'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const login = (form: LoginForm) => {
    return new Promise((_, reject) => {
      axios.post('auth/login', form).then(
        ({ data }) => {
          Cookies.set('token', data.data?.token)
          router.push('/events/')
        },
        () => reject()
      )
    })
  }

  const register = (form: RegisterForm) => {
    return new Promise((_, reject) => {
      axios.post('auth/register', form).then(
        ({ data }) => {
          Cookies.set('token', data.data.token)
          router.push('/events/')
        },
        () => reject()
      )
    })
  }

  const initUser = () => {
    return new Promise((resolve, reject) => {
      if (user.value !== null) return resolve(user.value)

      const token = Cookies.get('token')

      if (token) {
        if (!['/auth/login', '/auth/register'].includes(router.currentRoute.value.name))
          loading.value = true

        axios.post<InitUser>('auth/me').then(
          ({ data }) => {
            if (data.data) user.value = data.data?.user
            resolve(true)
          },
          () => {
            Cookies.remove('token')
            reject()
          }
        )
      } else {
        reject()
      }
    })
  }

  const logout = () => {
    return new Promise((_, reject) => {
      axios.post('auth/logout').then(
        () => {
          user.value = null
          Cookies.remove('token')
          router.push('/auth/login')
        },
        () => reject()
      )
    })
  }

  const resetLoading = () => (loading.value = false)

  return { user, loading, login, register, initUser, resetLoading, logout }
})
