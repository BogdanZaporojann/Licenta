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
        return await instance.get(`chats`).then(result => {
            console.log('chats items : ', result.data)
            return result.data
        }).catch(err => {
        })
    },
    async sendMessage({ message, toUser }) {
        return await instance.post(`addMessage`, { message, toUser }).then(result => {
            
            return result.data
        })
    },
    async getMessages(idToUser) {
        return await instance.get(`getMessages/${idToUser}`).then(result => {
            return result.data
        })
    }
}