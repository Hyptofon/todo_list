import axios from "axios";

const API_BASE = "https://dummyjson.com/todos";

export const fetchTodosApi = async (limit = 20) => {
    const res = await axios.get(`${API_BASE}?limit=${limit}`);
    return res.data?.todos || [];
};

export const deleteTodoApi = async (id) => {
    if (String(id).startsWith("local_")) return;
    await axios.delete(`${API_BASE}/${id}`);
};

export const toggleTodoApi = async (id, completed) => {
    if (String(id).startsWith("local_")) return;
    await axios.put(`${API_BASE}/${id}`, { completed });
};
