import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'vue-sonner'

const handelRequestError = (msg?: string) => {
  toast.error('an-error-occurred', {
    description: msg || 'something-went-wrong'
  })
}

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

Axios.interceptors.request.use((config) => {
  const token = Cookies.get('token')

  if (token) config.headers.set('Authorization', `Bearer ${token}`)

  return Promise.resolve(config)
})

Axios.interceptors.response.use(
  (request) => request,
  (error) => {
    const { success, message } = error
    handelRequestError(!success && message)

    return Promise.reject(error)
  }
)

export default Axios
