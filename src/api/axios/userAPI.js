import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/users/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const UserAPI = {
    async getUsersByRegex(name, page) {
        return instance.get(`getUsers?name=${name}&itemsCount=5&page=${page}`)
        .then(data => data.data)
        .catch(err=>{
            return err.name
        })
    }
}