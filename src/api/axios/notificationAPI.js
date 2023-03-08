import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/notifications",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const notificationAPI = {
    getNotification(itemsCount, page) {
        return instance.get(`?itemsCount=${itemsCount}&page=${page}`)
            .then(result => {
                return result.data
            })

    }
}