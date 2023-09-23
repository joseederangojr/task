import Axios, { AxiosError } from 'axios'
import { AppError, ValidationError } from '@/lib/errors'
import { AppResponseError } from '@/types'

const axios = Axios.create({
  baseURL: '/api',
  withCredentials: true
})

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('task.auth.token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

axios.interceptors.response.use(response => Promise.resolve(response.data), (err: AxiosError<AppResponseError<any>>) => {
  if (err.response?.status === 422) {
    return Promise.reject(new ValidationError(err.response?.data.errors!))
  }

  return Promise.reject(new AppError({ data: err.response?.data, status: err.response?.status }))
})

export { axios }
