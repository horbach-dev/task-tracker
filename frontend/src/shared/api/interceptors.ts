import { getAccessToken, removeToken } from '@/shared/api/token.service'
import { sessionService } from '@/entities/session'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorsCatch } from './error'

const config: CreateAxiosDefaults = {
  baseURL: process.env.BASE_URL ?? 'http://localhost:3000/api',
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
} 

const axiosClassic = axios.create(config)
const axiosWithAuth = axios.create(config)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosWithAuth.interceptors.response.use(value => value, async error => {

  if (
    error?.response?.status === 401 ||
    errorsCatch(error) === 'jwt expired' || 
    errorsCatch(error) === 'jwt must be provided' &&
    !error?.config?._isRetry
  ) {
    error.config._isRetry = true

    try {
      await sessionService.getNewTokens()

      return axiosWithAuth.request(error.config)
    } catch (error) {
      if (errorsCatch(error) === 'jwt expired') {
        removeToken()
      }
    }
  }

  throw error
})

export { axiosClassic, axiosWithAuth }