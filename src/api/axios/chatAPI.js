import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/messages",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const chatAPI = {
    async getChats() {
        const data = await instance.get(`chats`).then(result => result.data)
        return data;
    },
    async sendMessage({ message, toUser }) {
        const data = await instance.post(`addMessage`, { message, toUser }).then(result => {
            return result.data
        })
    },
    async getMessages(idToUser) {
        const data = await instance.get(`getMessages/${idToUser}`).then(result => {
            return result.data
        })
    }
}