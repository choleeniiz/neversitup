import { Method } from 'axios'
import { fetch } from '../utils/fetch'
import { ITodoReq } from '../interfaces/todo.interface'

const prefix = 'todos'

export const createTodo = (body: ITodoReq) => {
    const method: Method = 'POST'
    const path: string = `${prefix}`
    return fetch(method, path, body)
}

export const getAllTodo = () => {
    const method: Method = 'GET'
    const path: string = `${prefix}`
    return fetch(method, path)
}

export const getByID = (id: string) => {
    const method: Method = 'GET'
    const path: string = `${prefix}/${id}`
    return fetch(method, path)
}

export const updateTodo = (id: string, body: ITodoReq) => {
    const method: Method = 'PUT'
    const path: string = `${prefix}/${id}`
    return fetch(method, path, body)
}

export const deleteTodo = (id: string) => {
    const method: Method = 'DELETE'
    const path: string = `${prefix}/${id}`
    return fetch(method, path)
}
