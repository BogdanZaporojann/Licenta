import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://brainwaveapi.onrender.com/friends",
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
})

export const friendAPI = {
    async getFriends() {
        return instance.get().then(result => {
            return result.data.data.friends
        })
    },
    async requestFriend(requestedFriend) {
        instance.post("/request", { requestedFriend }).then(result => {
            console.log('axios request friend result : ', result.data)
            return result.data
        }).catch(err => {
            console.log('axios request friend err : ', err)
        })
    },
    async addFriend(newFriend) {
        instance.post("/add", { newFriend }).then(result =>result.data).catch(err => {
            console.log('axios add friend err : ', err)
        })
    },
    async removeFriend(oldFriend) {
        instance.post("/remove", { oldFriend }).then(result =>result.data).catch(err => {
            console.log('axios remove friend err : ', err)
        })
    },
}