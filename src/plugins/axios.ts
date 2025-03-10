import { handelRequestError } from '@/helpers'
import axios from 'axios'
import Cookies from 'js-cookie'

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en'
  }
})

Axios.interceptors.request.use((config) => {
  const token = Cookies.get('token')

  if (token) config.headers.set('Authorization', `Bearer ${token}`)

  return Promise.resolve(config)
})

Axios.interceptors.response.use(
  (request) => {
    if (!request.data.success) {
      handelRequestError(request.data.errors[0])
      return Promise.reject()
    }
    return request
  },
  () => {
    handelRequestError()
    return Promise.reject()
  }
)

export default Axios
