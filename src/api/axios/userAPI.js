import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/users/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const UserAPI = {
    async getUsersByRegex(name){
        return instance.get(`getUsers?name=${name}&count=1`).then(data => data.data)
    }
}