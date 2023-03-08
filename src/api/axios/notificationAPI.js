import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/notifications",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const notificationAPI = {
    async getNotification(itemsCount, page) {
        return await instance.get(`?itemsCount=${itemsCount}&page=${page}`)
            .then(result => {
                return result.data
            })

    },
    async removeNotification(notificationsID) {
        console.log('notificationsID axios : ', notificationsID)
        return await instance.delete("/remove", {notificationsID:["6404a3927cde2470f6adf952"]} ).then(result => {
            console.log('result : ', result)
            return result.data
        })
            .catch((err) => {
                console.log('err : ', err)
            })
    }
}