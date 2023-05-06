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
        })
    },
    async sendMessage({ message, toUser }) {
        return await instance.post(`addMessage`, { message, toUser }).then(result => {
            return result.data
        })
    },
    async getMessages(idToUser, pageNumber) {

        return await instance.get(`getMessages/${idToUser}?page=${pageNumber}&itemsCount=10`).then(result => {
            return result.data
        })
    }
}