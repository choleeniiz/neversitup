import { Method } from 'axios'
import { ILogin } from '../interfaces/login.interface'
import { fetch } from '../utils/fetch'

const prefix = 'users'

export const login = (body: ILogin) => {
  const method: Method = 'POST'
  const path: string = `${prefix}/auth`
  return fetch(method, path, body)
}
