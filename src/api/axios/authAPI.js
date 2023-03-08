import axios from "axios";

const baseUrl = 'https://brainwaveapi.onrender.com/auth/'




export const authAPI = {
    async registration(userData) {
        const data = await axios.post(`${baseUrl}registration`, { registrationData: userData })
        return data.data
    },
    async login(userData) {
        const data = await axios.post(`${baseUrl}login`, { email: userData.email, password: userData.password })

        return data.data
    }
}