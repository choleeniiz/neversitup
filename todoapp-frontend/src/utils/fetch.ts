import { notification } from 'antd'
import axios, { Method } from 'axios'
import { getToken } from './session'

export const fetch = (
  method: Method = 'get',
  endpoint = '/',
  body = {},
  headers = {},
  apiUrl = process.env.REACT_APP_API_URL,
  options = {}
) => {
  const url = `${apiUrl}/${endpoint}`
  const data = body
  const queryName = method === 'GET' || method === 'DELETE' ? 'params' : 'data'

  const api = axios.create({
    baseURL: url,
  })

  api.interceptors.request.use((config ) => {
    const user = getToken('user')
    if (user) {
      const userInfo = JSON.parse(user)
      config.headers!['Authorization'] = `Bearer ${userInfo.state.accessToken}`
    }
    return config
  })

  const res = api.request({
    method,
    url,
    [queryName]: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  })

  res.catch((error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized

        if (error.response?.data?.message) {
          notification.error({
            message: error.response.data.message,
          })
        }
      } else {
        notification.error({
          message: error.response.data.message,
        })
      }
    }
  })

  return Promise.resolve(res)
}
