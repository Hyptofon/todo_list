import axios from "axios"

const API_BASE = "https://dummyjson.com/todos"

export const fetchTodosApi = async (limit = 20, skip = 0) => {
    const res = await axios.get(`${API_BASE}?limit=${limit}&skip=${skip}`)
    return {
        todos: res.data?.todos || [],
        total: res.data?.total || 0
    }
}

export const deleteTodoApi = async (id) => {
    if (String(id).startsWith("local_")) return
    await axios.delete(`${API_BASE}/${id}`)
}

export const toggleTodoApi = async (id, completed) => {
    if (String(id).startsWith("local_")) return
    const res = await axios.put(`${API_BASE}/${id}`, { completed })
    return res.data
}

export const editTodoApi = async (id, newTitle) => {
    if (String(id).startsWith("local_")) {
        return { id, todo: newTitle }
    }
    const res = await axios.put(`${API_BASE}/${id}`, { todo: newTitle })
    return res.data
}