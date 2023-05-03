import axios from "axios";

const baseUrl = 'https://brainwaveapi.onrender.com/auth/'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/auth/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})


export const authAPI = {
    async registration(userData) {
        const data = await axios.post(`${baseUrl}registration`, { registrationData: userData })
        return data.data
    },
    async login(userData) {
        const data = await axios.post(`${baseUrl}login`, { email: userData.email, password: userData.password })
        return data.data
    },
    async logout(){
        const data = await axios.get(`${baseUrl}logout`)
        return data
    },
    async me(){
        const data = await instance.get(`${baseUrl}me`)
        return data.data
    },
    async getUserInfoByUsername(username){
        const data = await instance.get(`${baseUrl}getUserInfo?user=${username}`)
        return data.data
    }
}